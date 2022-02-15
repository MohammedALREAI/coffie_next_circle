import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const getCoffeeStoreById = async (req:NextApiRequest, res:NextApiResponse) => {
  const { id } = req.query ;

  try {
    if (id) {
      const records = await findRecordByFilter(id as string);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `id could not be found` });
      }
    } else {
      res.status(400);
      res.json({ message: "Id is missing" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
