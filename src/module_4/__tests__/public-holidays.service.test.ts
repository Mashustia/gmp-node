import axios from 'axios';
import request from 'supertest';

import {shortenPublicHoliday} from '../helpers';
import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from '../services/public-holidays.service';
import {PUBLIC_HOLIDAYS_API_URL} from '../config';
import { PublicHoliday } from '../types';

const mockHolidays = [
    {
        "date": "2023-01-01",
        "localName": "New Year's Day",
        "name": "New Year's Day",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-NIR"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-01-02",
        "localName": "New Year's Day",
        "name": "New Year's Day",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-ENG",
            "GB-WLS"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-01-02",
        "localName": "New Year's Day",
        "name": "New Year's Day",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-SCT"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-01-03",
        "localName": "New Year's Day",
        "name": "New Year's Day",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-SCT"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-03-17",
        "localName": "Saint Patrick's Day",
        "name": "Saint Patrick's Day",
        "countryCode": "GB",
        "fixed": true,
        "global": false,
        "counties": [
            "GB-NIR"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-04-07",
        "localName": "Good Friday",
        "name": "Good Friday",
        "countryCode": "GB",
        "fixed": false,
        "global": true,
        "counties": null,
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-04-10",
        "localName": "Easter Monday",
        "name": "Easter Monday",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-ENG",
            "GB-WLS",
            "GB-NIR"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-05-01",
        "localName": "Early May Bank Holiday",
        "name": "Early May Bank Holiday",
        "countryCode": "GB",
        "fixed": false,
        "global": true,
        "counties": null,
        "launchYear": 1978,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-05-08",
        "localName": "Coronation Bank Holiday",
        "name": "Coronation Bank Holiday",
        "countryCode": "GB",
        "fixed": true,
        "global": true,
        "counties": null,
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-05-29",
        "localName": "Spring Bank Holiday",
        "name": "Spring Bank Holiday",
        "countryCode": "GB",
        "fixed": false,
        "global": true,
        "counties": null,
        "launchYear": 1971,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-07-12",
        "localName": "Battle of the Boyne",
        "name": "Battle of the Boyne",
        "countryCode": "GB",
        "fixed": true,
        "global": false,
        "counties": [
            "GB-NIR"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-08-07",
        "localName": "Summer Bank Holiday",
        "name": "Summer Bank Holiday",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-SCT"
        ],
        "launchYear": 1971,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-08-28",
        "localName": "Summer Bank Holiday",
        "name": "Summer Bank Holiday",
        "countryCode": "GB",
        "fixed": false,
        "global": false,
        "counties": [
            "GB-ENG",
            "GB-WLS",
            "GB-NIR"
        ],
        "launchYear": 1971,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-11-30",
        "localName": "Saint Andrew's Day",
        "name": "Saint Andrew's Day",
        "countryCode": "GB",
        "fixed": true,
        "global": false,
        "counties": [
            "GB-SCT"
        ],
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-12-25",
        "localName": "Christmas Day",
        "name": "Christmas Day",
        "countryCode": "GB",
        "fixed": false,
        "global": true,
        "counties": null,
        "launchYear": null,
        "types": [
            "Public"
        ]
    },
    {
        "date": "2023-12-26",
        "localName": "Boxing Day",
        "name": "St. Stephen's Day",
        "countryCode": "GB",
        "fixed": false,
        "global": true,
        "counties": null,
        "launchYear": null,
        "types": [
            "Public"
        ]
    }
]

mockHolidays.forEach(Object.freeze);

const validCountry = 'GB';
const invalidCountry = 'AR';
const validYear = 2023;
const invalidYear = 2022;
const countryError = `Country provided is not supported, received: ${invalidCountry}`;
const yearError = `Year provided not the current, received: ${invalidYear}`;
const axiosGetSpy = jest.spyOn(axios, 'get');
const StatusCode = {
    OK: 200,
    NO_CONTENT: 204
}

describe('public-holidays.service unit tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getListOfPublicHolidays', () => {
        test('function should return correct list of public holidays', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({data: mockHolidays}));
            const expectedHolidays = mockHolidays.map(holiday => (shortenPublicHoliday(holiday)))

            const result = await getListOfPublicHolidays(validYear, validCountry);

            expect(result).toEqual(expectedHolidays);
        });

        test('function throws error for invalid year', async () => {
            await expect(getListOfPublicHolidays(invalidYear, validCountry)).rejects.toThrow(yearError);
        });

        test('function throws error for invalid country', async () => {
            await expect(getListOfPublicHolidays(validYear, invalidCountry)).rejects.toThrow(countryError);
        });

        test('function returns empty array if error occurs', async () => {
            axiosGetSpy.mockImplementation(() => Promise.reject(new Error('some exception text')));
            const shortPublicHolidays = await getListOfPublicHolidays(validYear, validCountry);

            expect(shortPublicHolidays).toEqual([])
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        test('function should return true if today is a holiday', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({ status: StatusCode.OK }));
            const isTodayAHoliday = await checkIfTodayIsPublicHoliday(validCountry);

            expect(isTodayAHoliday).toBe(true);
        });
        test('function should return false if today is not a holiday', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({ status: StatusCode.NO_CONTENT }));
            const isTodayAHoliday = await checkIfTodayIsPublicHoliday(validCountry);

            expect(isTodayAHoliday).toBe(false);
        });
        test('function throws error for invalid country', async () => {
            await expect(checkIfTodayIsPublicHoliday(invalidCountry)).rejects.toThrow(countryError);
        });
    })

    describe('getNextPublicHolidays', () => {
        test('function should return correct list of next holidays', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({data: mockHolidays}));
            const expectedHolidays = mockHolidays.map(holiday => (shortenPublicHoliday(holiday)))

            const result = await getNextPublicHolidays(validCountry);

            expect(result).toEqual(expectedHolidays);
        });

        test('function throws error for invalid country', async () => {
            await expect(getNextPublicHolidays(invalidCountry)).rejects.toThrow(countryError);
        });

        test('function returns empty array if error occurs', async () => {
            axiosGetSpy.mockImplementation(() => Promise.reject(new Error('some exception text')));
            const nextHolidays = await getNextPublicHolidays(validCountry);

            expect(nextHolidays).toEqual([])
        });
    })
});

describe('public-holidays.service integration tests', () => {
    describe('getListOfPublicHolidays', () => {
        test('function should return correct list of public holidays', async () => {
            const result = await getListOfPublicHolidays(validYear, validCountry);
            console.log('getListOfPublicHolidays', result);

            expect(result).toEqual(expect.any(Array));
        });
    });
    describe('checkIfTodayIsPublicHoliday', () => {
        test('function should return boolean for successful request', async () => {
            const result = await checkIfTodayIsPublicHoliday(validCountry);

            expect(result).toEqual(expect.any(Boolean));
        });
    });
    describe('getNextPublicHolidays', () => {
        test('function should return correct list of next holidays', async () => {
            const result = await getNextPublicHolidays(validCountry);
            console.log('getNextPublicHolidays', result);

            expect(result).toEqual(expect.any(Array));
        });
    });
});

describe('Nager.Date API - V3 E2E tests', () => {
    describe('Get Public Holidays test', () => {
        const api_url = `/PublicHolidays/${validYear}/${validCountry}`
        test('get public holidays API should return 200 and array of holidays', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(api_url);

            expect(status).toEqual(StatusCode.OK);
            body.forEach((holiday: PublicHoliday) => {
                expect(holiday).toEqual(
                    expect.objectContaining({
                        date: expect.any(String),
                        localName: expect.any(String),
                        name: expect.any(String),
                        countryCode: expect.any(String),
                        fixed: expect.any(Boolean),
                        global: expect.any(Boolean),
                    })
                );
            });
        });
    });

    describe('Get Next Public Holidays test', () => {
        const api_url = `/NextPublicHolidays/${validCountry}`
        test('should return 200 and array of upcoming public holidays', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(api_url);

            expect(status).toEqual(StatusCode.OK);
            body.forEach((holiday: PublicHoliday) => {
                expect(holiday).toEqual(
                    expect.objectContaining({
                        date: expect.any(String),
                        localName: expect.any(String),
                        name: expect.any(String),
                        countryCode: expect.any(String),
                        fixed: expect.any(Boolean),
                        global: expect.any(Boolean),
                    })
                );
            });
        });
    });
});
