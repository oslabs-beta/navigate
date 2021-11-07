import fs from 'fs';
import path from 'path';
import * as logger from '../server/GetLiveData/getKubernetesData';

const logPath = path.join(__dirname, '../navigate_logs/');

jest.mock('fs');

describe("test aggregated live logger", async () => {
  await logger.deleteFiles(logPath);
  it("should not have deleted the navigate_logs directory", (done) => {
    expect(fs.promises.access(logPath)).toBeTruthy();
  });
  it("should delete all files except one in navigate_logs directory", (done) => {
    expect(fs.promises.readdir(logPath)).toBeGreaterThan(0);
  });
});