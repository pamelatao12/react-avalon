import express from "express";
import { sitAtTable } from "./";

export const debugSitAtTable = async (
  req: express.Request,
  res: express.Response
) => {
  const player = await sitAtTable();
  res.send(player).status(200);
};
