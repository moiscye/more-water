import React from "react";
import tw from "twin.macro";

const TableContainer = tw.div`bg-white shadow-md rounded my-6 text-xl`;
const Table = tw.table`table-auto text-left w-full border-collapse`;
const Th = tw.th`py-4 px-4 bg-gray-100 font-bold text-2xl text-gray-800 border-b border-gray-400 `;
const Td = tw.td`py-4 px-4 border-b border-gray-400`;

export default ({
  tableTitle = "Your table title",
  rows = [
    { leftText: "Your left Text", rightText: "Your right text" },
    { leftText: "Your left Text", rightText: "Your right text" },
    { leftText: "Your left Text", rightText: "Your right text" },
  ],
}) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>{tableTitle}</Th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((item, index) => (
              <tr key={index}>
                <Td>
                  <strong>{item.leftText}: </strong>
                  {item.rightText}
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
