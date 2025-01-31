import React from 'react';
import { Button, Card, Flex, Typography, Dropdown, message, Space, Tooltip } from 'antd';
import StarRatings from "react-star-ratings";
import { DownOutlined, UserOutlined, HomeOutlined, BulbOutlined, SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import { BookEntity } from '~/entity/bookEntity';
import { formatToDate } from '~/helper/format';
import { useDispatch } from 'react-redux';
import { followBookAndUpdateStatusAsync } from '~/slices/book';
const { Text } = Typography;
const cardStyle = {
    width: '100%',
    margin: 10,
    border: '1px solid #ccc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '0px',
    padding: '10px 0px 10px 0px'
};

const imgStyle = {
    display: 'block',
    width: 100,
    height: 100,
};
const bookItem = {
    star: 10,
    numReviews: 2
}
const items = [
    {
        label: 'Muốn đọc',
        key: 'Muốn đọc',
        icon: <BulbOutlined />,
    },
    {
        label: 'Đang đọc',
        key: 'Đang đọc',
        icon: <MehOutlined />,
    },
    {
        label: 'Đã đọc',
        key: 'Đã đọc',
        icon: <SmileOutlined />,
    },
];


/**
 *
 * @param {*} props - BookEntity
 * @returns
 */
const TheAuthorBookItem = ({ bookItem, typeItem }) => {
    const dispatch = useDispatch()
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
        var bookId = bookItem.id
        var status = e.key
        dispatch(followBookAndUpdateStatusAsync({ bookId, status }))
            .unwrap()
            .then(async data => {
                // navigate('/login', { replace: true });
                console.log(data)
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <Card
            style={cardStyle}
            bodyStyle={{
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <div class="bookItem-container">
                <img
                    alt="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    style={imgStyle}
                />
                <div
                    className='bookItem-container-right'
                >
                    <Space direction='vertical'>
                        <Text strong>
                            {bookItem.name}
                        </Text>
                        <Text >
                            by {bookItem.authorName}
                        </Text>
                        <div>
                            {/*
                            <Text style={{ fontSize: "13px" }} strong>
                                {bookItem.numReviews > 0
                                    ? (bookItem.star / bookItem.numReviews).toFixed(1)
                                    : (0.01).toFixed(1)}
                                /5.0
                            </Text> */}
                            <Space>
                                <StarRatings
                                    rating={
                                        bookItem.scoring
                                    }
                                    starDimension="12px"
                                    starSpacing="4px"
                                    starRatedColor="rgb(230, 67, 47)"
                                />
                                <span className='review-information'>4.47 avg rating — 9,555,274 ratings — published {formatToDate(bookItem.publishDate)}</span>
                            </Space>
                        </div>

                    </Space>

                    {
                        typeItem != BSHAREnum.modelReviewPostType.without_dropdown_button &&
                        <Dropdown menu={menuProps}>
                            <Button size='large' style={{ marginTop: '8px', backgroundColor: 'var(--button-default-background-color)', color: 'white', position: 'absolute', right: '0px' }}>
                                <Space>
                                    Chưa đọc
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    }


                </div>
            </div>
        </Card>
    )

};
export default TheAuthorBookItem;
