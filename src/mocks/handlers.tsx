import { rest } from "msw";
import { Person } from "../types";

const data: Person[] = [
  {
    id: "f79e98uh-c34a-4dc7-a49e-9fadc0979fda",
    username: "Crispy",
    name: "Steve"
  },
  {
    id: "f79e34rf-c34a-4dc7-a49e-9fadc0979fda",
    username: "Mave",
    name: "John"
  },
  {
    id: "f79e23dr-c34a-4dc7-a49e-9fadc0979fda",
    username: "Crispy",
    name: "Chris"
  }
];

export interface RequestInfo {
  search: string; // or any other type
}

export const handlers = [
  rest.post<RequestInfo>("/search", (req, res, ctx) => {
    const { search } = req.body;

    const filterData: Array<Person> | [] = data.filter((p: Person) => {
      return (
        p.name.toLowerCase().includes(search?.toLowerCase()) ||
        p.username.toLowerCase().includes(search?.toLowerCase())
      );
    });

    return res(
      ctx.delay(1000),
      ctx.json({
        data: filterData
      })
    );
  })
];
