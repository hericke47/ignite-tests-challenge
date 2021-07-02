import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new User", async () => {
    const user = await createUserUseCase.execute({
      name: "fernando",
      email: "fernando@hotmail.com",
      password: "123456",
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new User with email existent", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "fernando",
        email: "fernando@hotmail.com",
        password: "123456",
      });

      await createUserUseCase.execute({
        name: "fernando 2",
        email: "fernando@hotmail.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});