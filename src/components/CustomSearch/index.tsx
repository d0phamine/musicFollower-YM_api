import { FC } from "react";
import { Input, Space } from "antd";
import type { GetProps } from "antd";

import "./index.scss"

const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

export const CustomSearch = () => {
	return <Search className="customSearch" placeholder="input search text" />;
};

