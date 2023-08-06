import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.join(process.cwd(), "data/properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (fs.existsSync(filePath)) {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const id = parseInt(req.query.id as string, 10); // Assuming the ID is passed as a query parameter named "id"

      if (!isNaN(id)) {
        const property = jsonData.find((item: any) => item.id === id);

        if (property) {
          res.status(200).json(property);
        } else {
          res.status(404).json({ message: "Property not found" });
        }
      } else {
        res.status(400).json({ message: "Invalid ID format" });
      }
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
