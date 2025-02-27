'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Image, Button, Typography, Tooltip, Badge, Dropdown } from 'antd';
import { UserOutlined, BellOutlined, QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ChatBot from '../components/ChatBot';
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface Props {
    children: React.ReactNode;
}

const EcommerceSystemLayout = (props: Props) => {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Trang chủ', href: '/', tooltip: 'Quay về trang chủ' },
        { label: 'Tính năng', href: '/feature', tooltip: 'Khám phá tính năng' },
        { label: 'Giải pháp', href: '/solutions', tooltip: 'Giải pháp cho doanh nghiệp' },
        { label: 'Bảng giá', href: '/pricing', tooltip: 'Xem các gói dịch vụ' },
        { label: 'Liên hệ', href: '/contact', tooltip: 'Kết nối với chúng tôi' },
    ];

    return (
        <Layout className="min-h-screen">
            <Header
                className={`sticky top-0 z-50 w-full px-6 flex items-center justify-between transition-all duration-300
                    ${'!bg-white/95 backdrop-blur-md shadow-sm'}`}
            >
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2" onClick={() => {
                        router.push('/');
                    }}>
                        <Image
                            src="/static/logo-short.png"
                            alt="Logo"
                            preview={false}
                            width={30}
                            className="h-8 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                        />
                        <h1 className="text-lg font-bold hidden sm:block">ECommerce Solution</h1>
                    </div>
                    <nav className="hidden xl:flex items-center space-x-10">
                        {menuItems.map((item, index) => (
                            <Tooltip key={index} title={item.tooltip} placement="bottom">
                                <Link
                                    href={item.href}
                                    className={`!text-[var(--primary)] font-medium text-[15px] transition-all
                                        ${scrolled ? 'hover:scale-105' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </Tooltip>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <Tooltip title="Trung tâm hỗ trợ">
                            <Button
                                type="text"
                                icon={<QuestionCircleOutlined />}
                                className="hover:text-blue-600 hover:scale-105 transition-all"
                            />
                        </Tooltip>
                        <Tooltip title="Thông báo">
                            <Badge count={5} size="small">
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    className="hover:text-blue-600 hover:scale-105 transition-all"
                                />
                            </Badge>
                        </Tooltip>
                        <Button
                            type="text"
                            icon={<UserOutlined />}
                            className="hidden sm:flex items-center hover:text-blue-600 hover:scale-105 transition-all"
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            type="primary"
                            className="hidden sm:block bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all"
                        >
                            Dùng thử miễn phí
                        </Button>
                    </div>
                    <Dropdown
                        menu={{
                            items: menuItems.map((item, index) => ({
                                key: index,
                                label: <Link href={item.href}>{item.label}</Link>
                            }))
                        }}
                        className="!hidden"
                    >
                        <Button type="text">
                            Menu <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Header>

            <Content>
                <div className='container m-auto'>
                    {props.children}
                    <ChatBot />
                </div>
            </Content>

            <Footer className="bg-gray-50 py-8">
                <div className="container mx-auto px-6 text-center">
                    <Text type="secondary" className="hover:text-blue-600 transition-colors">
                        © 2024 ECommerce Solution. All rights reserved.
                    </Text>
                </div>
            </Footer>
        </Layout>
    );
};

export default EcommerceSystemLayout;