import React from 'react';
import { Button, Empty, Typography } from 'antd';
import Image from 'next/image';

const { Text } = Typography;

interface EmptyDataProps {
    description?: string;
    className?: string;
    renderAction?: React.ReactNode;
}

const EmptyData: React.FC<EmptyDataProps> = ({
    description = "Không có dữ liệu",
    className = "",
    renderAction
}) => {
    return (
        <Empty
            className={`flex flex-col items-center ${className} [&_.ant-empty-image]:!h-fit`}
            image={
                <div className="relative w-12 h-12 opacity-50">
                    <Image
                        src="/static/logo-short.png"
                        alt="Empty Data"
                        fill
                        className="object-contain"
                    />
                </div>
            }
            description={
                <div className='flex flex-col'>
                    <Text type="secondary">
                        {description}
                    </Text>
                    {renderAction}
                </div>
            }
        />
    );
};

export default EmptyData;