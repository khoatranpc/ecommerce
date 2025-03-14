import React from "react";
import { Card, Skeleton, Space, Divider } from "antd";

const ProductDetailLoading = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-5">
                <Card>
                    <Skeleton.Image
                        active
                        className="!w-full !h-[400px] !block"
                    />
                    <div className="flex gap-2 mt-4">
                        {[...Array(5)].map((_, idx) => (
                            <Skeleton.Image
                                key={idx}
                                active
                                className="!w-16 !h-16"
                            />
                        ))}
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-7">
                <Card>
                    <Skeleton.Button active className="!w-20 !h-6 mb-4" />
                    <Skeleton.Input active className="!w-3/4 !h-8 mb-4" />

                    <Space className="mb-6">
                        <Skeleton.Input active className="!w-32" />
                        <Divider type="vertical" />
                        <Skeleton.Input active className="!w-32" />
                    </Space>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <Skeleton.Input active className="!w-40 !h-10" />
                        <Space className="mt-2">
                            <Skeleton.Input active className="!w-32" />
                            <Skeleton.Button active className="!w-16" />
                        </Space>
                    </div>

                    <Space direction="vertical" className="w-full mb-6">
                        <Space>
                            <Skeleton.Input active className="!w-20" />
                            <Skeleton.Input active className="!w-32" />
                        </Space>
                        <Space>
                            <Skeleton.Button active className="!w-40 !h-10" />
                            <Skeleton.Button active className="!w-32 !h-10" />
                        </Space>
                    </Space>

                    <Divider />

                    {/* Shop Info Loading */}
                    <div className="flex items-center gap-4">
                        <Skeleton.Avatar active size={64} />
                        <div className="flex-1">
                            <Skeleton.Input active className="!w-40 mb-2" />
                            <Space>
                                <Skeleton.Input active className="!w-24" />
                                <Skeleton.Input active className="!w-24" />
                            </Space>
                        </div>
                        <Space>
                            <Skeleton.Button active />
                            <Skeleton.Button active />
                        </Space>
                    </div>
                </Card>

                <Card className="mt-8">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </Card>
            </div>
        </div>
    );
};

export default ProductDetailLoading;