import { NextFunction, Request, Response } from "express";
import _ from 'lodash';

export default function validateListData(req: Request, res: Response, next: NextFunction) {
    const { id, description, limit, creationDate, updatedDate, list } = req.body;

    if (!_.isString(id) || _.isEmpty(id)) {
        return res.status(400).send('ID is missing or in bad format');
    }

    if (!_.isString(description) || _.isEmpty(description)) {
        return res.status(400).send('Description is missing or in bad format');
    }

    if (!_.isNumber(limit) || limit <= 0) {
        return res.status(400).send('Limit is missing or must be a positive number');
    }

    if (!_.isDate(new Date(creationDate)) || isNaN(new Date(creationDate).getTime())) {
        return res.status(400).send('Creation date is missing or in bad format');
    }

    if (!_.isDate(new Date(updatedDate)) || isNaN(new Date(updatedDate).getTime())) {
        return res.status(400).send('Updated date is missing or in bad format');
    }

    if (!_.isArray(list)) {
        return res.status(400).send('List must be an array');
    }

    res.locals.listData = { id, description, limit, creationDate, updatedDate, list };
    next();
}
