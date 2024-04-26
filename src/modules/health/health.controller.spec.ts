import { Test, TestingModule } from "@nestjs/testing";
import { HealthController, HealthReturnType } from "./health.controller";
import { HealthService } from "./health.service";
import { HttpStatus } from "@nestjs/common";

describe("HealthController", () => {
  let controller: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get(HealthController);
    healthService = module.get(HealthService);
  });

  describe("checkApiHealth", () => {
    it("should return the health status of the API", async () => {
      const expectedResult: HealthReturnType = {
        statusCode: HttpStatus.OK,
        message: "Hello AskSuite World!",
      };

      jest
        .spyOn(healthService, "checkApiHealth")
        .mockReturnValue(expectedResult);

      const result = await controller.checkApiHealth();

      expect(result).toEqual(expectedResult);
    });
  });
});
