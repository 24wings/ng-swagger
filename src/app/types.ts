export interface Api {
    id: number;
    title: string;
    url: string;
    method: "Post" | "Get";
    query: any;
    body: any;
    status: ApiStatus;
    res?: Response;
    percent: number;
}
export type ApiStatus = "exception" | "active" | "success";
export interface Res {
    status: number;
}