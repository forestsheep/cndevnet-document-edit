import { KintoneRestAPIClient } from '@kintone/rest-api-client'

// 商品リストのアプリIDを入力してください
const productsAppId = 12

const events = ['app.record.create.submit', 'app.record.edit.submit']

kintone.events.on(events, async (event) => {
  const { record } = event

  // kintoneへ接続するためのインスタンスを作成
  const client = new KintoneRestAPIClient()

  // 今回はコード簡略化のために、テーブルの商品は重複禁止とします。
  // ただの簡易的な重複チェックなので意味は理解しなくてOKです。
  const hasDuplicatedRow = record.报价明细.value.some((rowA, indexA, arr) => {
    return arr.find((rowB, indexB) => indexA !== indexB && rowA.value.型号.value === rowB.value.型号.value)
  })
  if (hasDuplicatedRow) {
    event.error = '重複した商品は登録できません。'
    return event
  }

  // テーブルに入っている商品レコードを取得
  let products
  try {
    products = await client.record.getRecords({
      app: productsAppId,
      query: `型号 in (${record.报价明细.value.map((row) => `"${row.value.型号.value}"`).join(', ')})`,
    })
  } catch (error) {
    event.error = 'レコードの取得に失敗しました'
    return event
  }

  // 商品リストの在库数量を差し引いたデータを作成
  const deductedProductRecords = products.records.map((productRecord) => {
    const tableRow = record.报价明细.value.find((row) => productRecord.型号.value === row.value.型号.value)

    // アップデートのキーとなる型号と, 差し引いた在库数量を格納する。
    return {
      型号: {
        value: productRecord.型号.value,
      },
      在库数量: {
        value: Number(productRecord.在库数量.value) - Number(tableRow.value.数量.value),
      },
    }
  })

  // 在库数量を差し引いたあと在库数量が0未満になるようなレコードがないか確認
  const noStockRecords = deductedProductRecords.filter((productRecord) => Number(productRecord.在库数量.value) < 0)

  // 差し引き1未満のレコードがでた場合はエラーとみなしレコードの作成をストップさせる
  if (noStockRecords.length > 0) {
    // event.errorにデータをいれたあとeventを返すとレコードの作成をストップできる
    // どの商品が問題か示すために在庫が足りない商品の型号を列挙する
    event.error = `在庫がない商品があります。型号 ${noStockRecords
      .map((productRecord) => productRecord.型号.value)
      .join(', ')}`

    return event
  }

  // 問題なければアップデート
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) => {
        return {
          updateKey: {
            field: '型号',
            value: productRecord.型号.value,
          },
          record: {
            在库数量: {
              value: productRecord.在库数量.value,
            },
          },
        }
      }),
    })
  } catch (error) {
    event.error = `アップデートに失敗しました。${error.message}`
    return event
  }

  return event
})
