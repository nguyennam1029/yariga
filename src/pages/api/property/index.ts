import { NextApiRequest, NextApiResponse } from "next";
import properties from "@data/properties.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let filteredData = properties;
  const params: {
    text?: string;
    state?: string;
    status?: string;
    type?: string;
    country?: string;
    page?: string;
    limit?: string;
  } = req.query;
  const { text, state, status, type, page, limit } = params;

  if (text && typeof text === "string") {
    filteredData = filteredData.filter((item) => {
      return (
        item.title.toLowerCase().includes(text.toLowerCase() as string) ||
        item.address.toLowerCase().includes(text.toLowerCase() as string)
      );
    });
  }

  if (state) {
    filteredData = filteredData.filter((item) => {
      return item.state === state;
    });
  }

  if (status) {
    filteredData = filteredData.filter((item) => {
      return item.status === status;
    });
  }

  if (type) {
    filteredData = filteredData.filter((item) => {
      return item.type === type;
    });
  }



  // Xác định số lượng bản ghi trên mỗi trang
  const itemsPerPage = parseInt(limit as string) || 0;

  // Xác định trang hiện tại
  const currentPage = parseInt(page as string) || 1;

  // Tính vị trí bắt đầu và kết thúc cho phân trang
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Trích xuất dữ liệu cho trang hiện tại
  const paginatedData = filteredData.slice(start, end);


  
  // if (offset && limit) {
  //   const start = parseInt(offset as string);
  //   const end = start + parseInt(limit as string);
  //   filteredData = filteredData.slice(start, end);
  // }
 // Đặt giá trị của x-total-count trong header
  res.setHeader("x-total-count", filteredData.length);
  res.status(200).json({
    properties: paginatedData,
    total: filteredData.length,
  });
}