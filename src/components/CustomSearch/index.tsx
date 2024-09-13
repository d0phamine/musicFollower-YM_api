import { FC } from "react";
import { Input, Space } from "antd";
import type { GetProps } from "antd";

const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

export const CustomSearch = () => {
	return <Search className="custom" placeholder="input search text" />;
};

