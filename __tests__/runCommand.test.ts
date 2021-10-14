import exportObj from '../server/runCommand';
import * as kubernetesData from '../server/GetLiveData/getKubernetesData';
import fs from 'fs';
import * as path from 'path';

describe("run sh scripts from node", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  exportObj.runCommand(`${exportObj.command} -n mafia &> ./navigate_logs/${exportObj.fileName}`);
  it("should create a txt file", (done) => {
    expect(fs.promises.access(path.join(__dirname, '../navigate_logs/')+exportObj.fileName, fs.constants.R_OK | fs.constants.W_OK)).toBeTruthy();
    done();
  });

  xit("should get an array of pod names", (done) => {
    const parseSpy = jest.mock(path.join(__dirname, '../server/GetLiveData/getKubernetesData'));
    let readFileCallback: Function;
    jest.spyOn(fs, 'readFile').mockImplementation((path: fs.PathOrFileDescriptor, callback) => {
      readFileCallback = callback;
    });
    kubernetesData.parsePodNames();
    const someError = new Error('read file failed');
    expect(() => readFileCallback(someError, null)).toThrowError();
    expect(fs.readFile).toBeCalledWith(path.join(__dirname, `../navigate_logs/${exportObj.fileName}`), 'utf-8', expect.any(Function));
    done();
  });
});