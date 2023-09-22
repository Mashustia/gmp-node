import axios from 'axios';
import {shortenPublicHoliday} from '../helpers';
import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from '../services/public-holidays.service';

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
    }
]

const validCountry = 'GB';
const invalidCountry = 'AR';
const validYear = 2023;
const invalidYear = 2022;
const countryError = `Country provided is not supported, received: ${invalidCountry}`;
const yearError = `Year provided not the current, received: ${invalidYear}`;
const axiosGetSpy = jest.spyOn(axios, 'get');
const StatusCode = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500
}

describe('public-holidays.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getListOfPublicHolidays', () => {
        test('function should return correct holidays', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({data: mockHolidays}));
            const expectedHolidays = mockHolidays.map(holiday => (shortenPublicHoliday(holiday)))

            const result = await getListOfPublicHolidays(validYear, validCountry);

            expect(result).toEqual(expectedHolidays);
        });

        test('function returns throws error for invalid year', async () => {
            await expect(getListOfPublicHolidays(invalidYear, validCountry)).rejects.toThrow(yearError);
        });

        test('function returns throws error for invalid country', async () => {
            await expect(getListOfPublicHolidays(validYear, invalidCountry)).rejects.toThrow(countryError);
        });

        test('function returns empty array if error occurs', async () => {
            axiosGetSpy.mockImplementation(() => Promise.reject(new Error('some exception text')));
            const shortPublicHolidays = await getListOfPublicHolidays(validYear, validCountry);

            expect(shortPublicHolidays).toEqual([])
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        test('function should return correct true successful request', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({ status: StatusCode.OK }));
            const result = await checkIfTodayIsPublicHoliday(validCountry);

            expect(result).toBe(true);
        });
        test('function should return false if error ocures', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({ status: StatusCode.INTERNAL_SERVER_ERROR }));
            const result = await checkIfTodayIsPublicHoliday(validCountry);

            expect(result).toBe(false);
        });
        test('function returns throws error for invalid country', async () => {
            await expect(checkIfTodayIsPublicHoliday(invalidCountry)).rejects.toThrow(countryError);
        });
    })

    describe('getNextPublicHolidays', () => {
        test('function should return correct holidays', async () => {
            axiosGetSpy.mockImplementation(() => Promise.resolve({data: mockHolidays}));
            const expectedHolidays = mockHolidays.map(holiday => (shortenPublicHoliday(holiday)))

            const result = await getNextPublicHolidays(validCountry);

            expect(result).toEqual(expectedHolidays);
        });

        test('function returns throws error for invalid country', async () => {
            await expect(getNextPublicHolidays(invalidCountry)).rejects.toThrow(countryError);
        });

        test('function returns empty array if error occurs', async () => {
            axiosGetSpy.mockImplementation(() => Promise.reject(new Error('some exception text')));
            const shortPublicHolidays = await getNextPublicHolidays(validCountry);

            expect(shortPublicHolidays).toEqual([])
        });
    })
});
