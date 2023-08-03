export type TPropertyStatus =  "sale" | "rent" |  ""
export type TFilter = {

     text?: string,
    status ?:TPropertyStatus,
    type?: string,
    country ?:string,
    state?: string,
    page?:number,
    limit?: number
}