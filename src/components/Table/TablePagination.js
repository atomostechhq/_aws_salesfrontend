import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LeftArrowIconContainer,
  RightArrowIconContainer,
  SelectContainer,
  TablePaginationContainer,
  ItemsPerPageLeftContainer,
  ItemsPerPageRightContainer,
  ItemsPerPageContainer,
  PageVariableContainer,
} from "./TablePagination.style.js";
import { v4 as uuid } from "uuid";

const TablePagination = ({ totalDataCnt, itemsPerPageArray }) => {
  console.log("table pagination runs");
  const urlSearchParams = new URLSearchParams(window.location.search);
  let params = Object.fromEntries(urlSearchParams.entries());
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("i ran");
    setSearchParams(() => ({
      ...params,
      size: itemsPerPageArray.includes(parseInt(params?.size))
        ? params?.size
        : String(itemsPerPageArray[0]),
      page:
        parseInt(params?.page) <=
        Math.ceil(parseInt(totalDataCnt) / parseInt(params?.page))
          ? params?.page
          : 1,
    }));
  }, [params?.size, params?.page]);

  return (
    <>
      <TablePaginationContainer>
        <ItemsPerPageContainer>
          <ItemsPerPageLeftContainer>
            <small>Items per page</small>
            <select
              value={params?.size}
              onChange={(e) => {
                setSearchParams(() => ({ ...params, size: e.target.value }));
              }}
            >
              {itemsPerPageArray?.map((items) => {
                return (
                  <option value={items} key={uuid()}>
                    {items}
                  </option>
                );
              })}
            </select>
          </ItemsPerPageLeftContainer>

          <ItemsPerPageRightContainer>
            <small>
              {params?.page * params?.size - params?.size} -{" "}
              {params?.page * params?.size > totalDataCnt
                ? totalDataCnt
                : params?.page * params?.size}{" "}
              of {totalDataCnt} items
            </small>
          </ItemsPerPageRightContainer>
        </ItemsPerPageContainer>

        <PageVariableContainer>
          <SelectContainer
            value={params?.page}
            onChange={(e) => {
              setSearchParams(() => ({ ...params, page: e.target.value }));
            }}
          >
            {[
              ...Array(
                Math.ceil(
                  parseInt(totalDataCnt) /
                    parseInt(params?.size ? params?.size : itemsPerPageArray[0])
                )
              ),
            ].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </SelectContainer>
          <small>of {Math.ceil(totalDataCnt / params?.size)} pages</small>
          <LeftArrowIconContainer
            onClick={() => {
              params?.page > 1 &&
                setSearchParams(() => ({ ...params, page: params?.page - 1 }));
            }}
            active={(params?.page > 1).toString()}
          />
          <RightArrowIconContainer
            onClick={() => {
              params?.page < Math.ceil(totalDataCnt / params?.size) &&
                setSearchParams(() => ({
                  ...params,
                  page: parseInt(params?.page) + 1,
                }));
            }}
            active={(
              params?.page < Math.ceil(totalDataCnt / params?.size)
            ).toString()}
          />
        </PageVariableContainer>
      </TablePaginationContainer>
    </>
  );
};

export default TablePagination;
