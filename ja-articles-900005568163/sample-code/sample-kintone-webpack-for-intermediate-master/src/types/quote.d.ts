declare namespace KintoneTypes {
  interface Quote {
    备注: kintone.fieldTypes.MultiLineText;
    报价日: kintone.fieldTypes.Date;
    宛名: kintone.fieldTypes.SingleLineText;
    报价单号: kintone.fieldTypes.SingleLineText;
    合计金额: kintone.fieldTypes.Calc;
    报价明细: {
      type: "SUBTABLE";
      value: {
        id: string;
        value: {
          数量: kintone.fieldTypes.Number;
          型号: kintone.fieldTypes.SingleLineText;
          price: kintone.fieldTypes.Number;
          商品名: kintone.fieldTypes.SingleLineText;
          小计: kintone.fieldTypes.Calc;
        };
      }[];
    };
  }
  interface SavedQuote extends Quote {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
