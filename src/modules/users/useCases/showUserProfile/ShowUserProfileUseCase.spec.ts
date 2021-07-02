import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able show profile user", async () => {
    const user = await createUserUseCase.execute({
      name: "fernando",
      email: "fernando@hotmail.com",
      password: "123456",
    });

    const userProfile = await showUserProfileUseCase.execute(user.id as string);
    expect(userProfile).toBeInstanceOf(User);
    expect(userProfile).toHaveProperty("id");
  });

  it("should not be able show profile user when user not exist", async () => {
    expect(async () => {
      await showUserProfileUseCase.execute("non valid id");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});