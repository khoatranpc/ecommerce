import React, { useEffect } from "react";
import EmptyData from "@/src/components/EmptyData";
import { IObj } from "@/src/types";
import { queryGetOnePost } from "@/src/utils/graphql-queries";
import { usePostDetail } from "@/src/utils/hooks";

interface Props {
  productId?: string;
}
const ProductPost = (props: Props) => {
  const post = usePostDetail();
  const getPost = post.data?.getOnePost as IObj;
  useEffect(() => {
    post.query({
      query: queryGetOnePost(),
      variables: {
        input: {
          value: props.productId,
        },
      },
    });
  }, []);
  if (!getPost)
    return (
      <EmptyData description="Hiện chưa có bài viết về thông tin sản phẩm!" />
    );
  return (
    <div
      className="contentHtml"
      dangerouslySetInnerHTML={{ __html: (getPost.content as string) ?? "" }}
    />
  );
};

export default ProductPost;
