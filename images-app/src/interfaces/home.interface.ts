export default interface HomePayload {
    hasMore: boolean;
    page: number;
    pageCount: number;
    pictures: { id: string; cropped_picture: string }[];
}
  