import "./search.css"
import { AudioOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input, Space, Radio, Pagination, AutoComplete } from 'antd';
import TheAuthorBookItem from "~/components/author/TheAuthorBookItem";
import "~/components/author/bookItem.css";
import { useLoaderData } from "react-router-dom";
import { mapToClass } from "~/helper/mappingToClass";
import { BookEntity } from "~/entity/bookEntity";
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const plainOptions = ['All', 'Tác giả', 'Tiêu đề'];
const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBookPage = () => {
    const [value1, setValue1] = useState('All');
    const bookSearchList = mapToClass(useLoaderData(), BookEntity)
    console.log(bookSearchList)
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    return (
        <>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"

                width={300}
                onSearch={onSearch}
            />
            <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />

            {
                bookSearchList.map((bookSearchListItem) => {
                    return <TheAuthorBookItem bookItem={bookSearchListItem} />
                })
            }


            <Pagination defaultCurrent={6} total={500} style={{ marginTop: '2rem', marginBottom: '2rem', right: '0px', position: 'absolute' }} />
        </>
    )

}
export default SearchBookPage
