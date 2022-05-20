const request = require('supertest')
const app = require('../app')

const path = '/api/user_game/'
const id = 1

describe('user_game todos list', () => {
    
    test(`GET ${path} --> Success get 0 data `, async () => {
        const { body, statusCode} = await request(app).get(`${path}`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: expect.arrayContaining([]),
                message: "no data"
            })
        )
    })

    test(`GET ${path}99 --> No data found by id`, async () => {
        const { body, statusCode } = await request(app).get(`${path}99`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: null,
                message: "data not found"
            })
        )
    })

    test(`POST ${path} --> Success create user`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            email: "anangbagus666@gmail.com",
            password: "12345"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(201)
        expect(body).toEqual(
            expect.objectContaining({
                data: expect.anything(),
                message: "success created"
            })
        )
    })
    
    test(`GET ${path} --> Success get all datas`, async () => {
        const { body, statusCode} = await request(app).get(`${path}`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: expect.any(Array),
                message: "success"
            })
        )
    })

    test(`GET ${path}${id} --> Success get data by id`, async () => {
        const { body, statusCode } = await request(app).get(`${path}${id}`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: expect.anything(),
                message: "data obtained"
            })
        )
    })

    test(`POST ${path} --> Cannot duplicate email`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            email: "anangbagus666@gmail.com",
            password: "12345"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: "Validation error"
            })
        )
    })

    test(`POST ${path} --> Email and password needed`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            email: "anangbagus666@gmail.com",
            // password: "12345"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: "notNull Violation: user_game.email cannot be null",
                message: "notNull Violation: user_game.password cannot be null"
            })
        )
    })

    test(`PUT ${path}${id} --> Success update data`, async () => {
        const { body, statusCode } = await request(app).put(`${path}${id}`)
        .send({
            email: "anangbagus666@gmail.com",
            password: "bagus"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                message: "data updated"
            })
        )
    })

    test(`PUT ${path}99 --> Updated data not found`, async () => {
        const { body, statusCode } = await request(app).put(`${path}99`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: null,
                message: "data not found"
            })
        )
    })

    test(`DELETE ${path}${id} --> Success delete data by id`, async () => {
        const { body, statusCode } = await request(app).delete(`${path}${id}`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                message: "data deleted"
            })
        )
    })

    test(`DELETE ${path}99 --> Deleted data not found`, async () => {
        const { body, statusCode } = await request(app).delete(`${path}99`)
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(200)
        expect(body).toEqual(
            expect.objectContaining({
                data: null,
                message: "data not found"
            })
        )
    })
})