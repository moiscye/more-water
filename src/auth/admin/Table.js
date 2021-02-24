import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

const Table = styled.table(() => [
  tw`w-full flex flex-row flex-no-wrap  sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5`,
  `@media (min-width: 640px) { 
    display: inline-table !important;
    thead tr:not(:first-child) {
      display: none;
    }
  }
  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  `,
]);
//Head of table
const Thead = tw.thead``;
const THr = tw.tr`bg-gray-300 flex flex-col flex-no-wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0`;

//body of table
const Tbody = tw.tbody`flex-1 sm:flex-none`;
const Tr = tw.tr`flex flex-col flex-no-wrap sm:table-row mb-2 sm:mb-0 `;
const Td = styled.td(({ hover = true, capitalize }) => [
  tw`border-gray-200 md:border-gray-300 border p-3 truncate`,
  hover && tw`hover:bg-gray-300`,
  capitalize && tw`capitalize`,
]);
const ActionContainer = tw.div`flex md:justify-center`;
const Action = styled.p(({ warning, danger }) => [
  tw`mr-2 px-2 xl:px-2 font-thin text-gray-100 bg-primary-500 rounded cursor-pointer hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`,
  danger && tw`bg-red-600 hocus:bg-red-700`,
  warning && tw`bg-yellow-600 hocus:bg-yellow-700`,
]);
export default ({
  rows = [
    { leftText: "Your left Text", rightText: "Your right text" },
    { leftText: "Your left Text2", rightText: "Your right text2" },
    { leftText: "Your left Text3", rightText: "Your right text3" },
  ],
  deleteEvent = null,
  updateEvent = null,
}) => {
  let keys = Object.keys(rows[0]);
  return (
    <div css={tw`container`}>
      <Table>
        <Thead>
          {rows &&
            rows.map((item, index) => (
              <THr key={index}>
                {keys &&
                  keys.map((insideItem, insideIndex) => (
                    <Td capitalize key={insideIndex}>
                      {insideItem}
                    </Td>
                  ))}
                <Td>{`Actions`}</Td>
              </THr>
            ))}
        </Thead>
        <Tbody>
          {rows &&
            rows.map((item, index) => (
              <Tr key={index}>
                {keys &&
                  keys.map((insideItem, insideIndex) => (
                    <Td key={insideIndex}>
                      {typeof item[insideItem] === "object"
                        ? item[insideItem] && item[insideItem].name
                        : item[insideItem]}
                    </Td>
                  ))}
                <Td hover={false}>
                  <ActionContainer>
                    <Action danger onClick={() => deleteEvent(item)}>
                      Borrar
                    </Action>
                    <Action warning onClick={() => updateEvent(item)}>
                      Actualizar
                    </Action>
                  </ActionContainer>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
};
