import React from "react";
export interface IObj {
    [k: string]: any;
}
export interface ComponentProps extends IObj {
    children?: React.ReactNode;
}