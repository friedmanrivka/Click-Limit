export interface AppList{
id: string;//appName
description: string;
}
export interface List{
    id: string;
    description: string;
    limit: number;
    creationDate: Date;
    updatedDate: Date;
    list:AppList[];
}