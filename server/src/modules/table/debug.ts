import express from "express";
import { createTable, getTable, listTables, startGame } from ".";

export const debugCreateTable = async (
  req: express.Request,
  res: express.Response
) => {
  const table = await createTable();
  res.send(table).status(201);
};

export const debugListTables = async (
  req: express.Request,
  res: express.Response
) => {
  const tables = await listTables();
  res.send(tables).status(200);
};

export const debugGetTable = async (
  req: express.Request,
  res: express.Response
) => {
  const table = await getTable(req.params.id);
  res.send(table).status(200);
};

export const debugStartGame = async (
  req: express.Request,
  res: express.Response
) => {
  await startGame();
  res.send().status(204);
};
