const Airtable = require("airtable");
import  getConfig from "next/config";


const  {publicRuntimeConfig:{
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_KEY
} }=getConfig()

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const getMinifiedRecord = (record:Object) => {
  return {
    recordId:  record.id ,
    ...record.fields!,
  };
};

const getMinifiedRecords = (records:Array<any>) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
