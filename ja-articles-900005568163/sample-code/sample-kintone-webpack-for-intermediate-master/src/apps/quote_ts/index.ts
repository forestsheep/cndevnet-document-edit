import {KintoneRestAPIClient, KintoneRecordField} from '@kintone/rest-api-client';

// 商品应用的类型定义
type SavedProduct = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  更新者: KintoneRecordField.Modifier;
  作成者: KintoneRecordField.Creator;
  レコード番号: KintoneRecordField.RecordNumber;
  更新日時: KintoneRecordField.UpdatedTime;
  作成日時: KintoneRecordField.CreatedTime;
  service_type: KintoneRecordField.RadioButton;
  note: KintoneRecordField.MultiLineText;
  型号: KintoneRecordField.SingleLineText;
  product_name: KintoneRecordField.SingleLineText;
  price: KintoneRecordField.Number;
  在库数量: KintoneRecordField.Number;
}

// 请输入商品列表的应用ID
const productsAppId = 122;

const events = ['app.record.create.submit', 'app.record.edit.submit'];

kintone.events.on(events, async (event) => {
  const record = event.record as KintoneTypes.Quote;

  // 创建一个连接kintone的实例
  const client = new KintoneRestAPIClient({});

  // 这次为了简便，表中的商品不允许重复。
  // 只是简易的重复检查，不理解也没关系。
  const hasDuplicatedRow = record.报价明细.value.some((rowA, indexA, arr) => {
    return arr.find(
      (rowB, indexB) =>
        indexA !== indexB && rowA.value.型号.value === rowB.value.型号.value
    );
  });
  if (hasDuplicatedRow) {
    event.error = '不允许选择重复的商品';
    return event;
  }

  // 获取表中的商品记录
  let products;
  try {
    // 通过指定泛型,在使用products变量时，可以推断出类型
    products = await client.record.getRecords<SavedProduct>({
      app: productsAppId,
      query: `型号 in (${record.报价明细.value
        .map((row) => `"${row.value.型号.value}"`)
        .join(', ')})`,
    });
  } catch (error) {
    event.error = '获取记录失败';
    return event;
  }

  // 在商品列表的库存中减去相应数量
  const deductedProductRecords = products.records.map((productRecord) => {
    const tableRow = record.报价明细.value.find(
      (row) => productRecord.型号.value === row.value.型号.value
    );

    // 存放型号值和计算后的库存值
    return {
      型号: {
        value: productRecord.型号.value,
      },
      在库数量: {
        value:
          Number(productRecord.在库数量.value) -
          Number(tableRow?.value.数量.value),
      },
    };
  });

  // 计算后的库存值是否有小于0的情况
  const noStockRecords = deductedProductRecords.filter(
    (productRecord) => Number(productRecord.在库数量.value) < 0
  );

  // 存在1条以上记录时报错并跳过保存
  if (noStockRecords.length > 0) {
    // event.error中存放错误信息后返回
    // 列出出问题的商品型号
    event.error = `存在库存不够的商品。型号 ${noStockRecords
      .map((productRecord) => productRecord.型号.value)
      .join(', ')}`;

    return event;
  }

  // 没有问题的话更新
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
        };
      }),
    });
  } catch (error) {
    event.error = `更新失败 ${error.message}`;
    return event;
  }

  return event;
});
