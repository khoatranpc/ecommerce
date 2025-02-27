import React from 'react';
import { ComponentProps } from '@/src/types';
import dynamic from 'next/dynamic';
import Loading from '@/src/components/Loading';

const EcommerceSystemLayout = dynamic(() => import('@/src/layouts/EcommerceSystemLayout'), {
    loading: () => <Loading />
});

const layout = (props: ComponentProps) => {
    return (
        <EcommerceSystemLayout>
            {props.children}
        </EcommerceSystemLayout>
    )
}

export default layout