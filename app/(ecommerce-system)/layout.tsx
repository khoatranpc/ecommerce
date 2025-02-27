import React from 'react';
import EcommerceSystemLayout from '@/src/layouts/EcommerceSystemLayout';
import { ComponentProps } from '@/src/types'

const layout = (props: ComponentProps) => {
    return (
        <EcommerceSystemLayout>
            {props.children}
        </EcommerceSystemLayout>
    )
}

export default layout