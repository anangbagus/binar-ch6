const request = require('supertest')
const app = require('../app')

const path = '/api/user_history/'
const id = 1

const insertUser = async () => {
    await request(app).post(`/api/user_game/`)
    .send({
        email: "anangbagus666@gmail.com",
        password: "12345"
    })
}

const deleteUser = async () => {
    await request(app).delete(`/api/user_game/1`)
}

describe('user_history todos list', () => {
    
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

    test(`GET ${path}${id} --> No data found by id`, async () => {
        const { body, statusCode } = await request(app).get(`${path}${id}`)
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
    
    insertUser()
    
    test(`POST ${path} --> Success create history`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            userGameUserId: 1,
            result: "win"
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

    test(`POST ${path} --> userGameUserId and name needed`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            userGameUserId: 1,
            //result: "win"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: "notNull Violation: user_game_history.userGameUserId cannot be null",
                message: "notNull Violation: user_game_history.result cannot be null"
            })
        )
    })

    test(`POST ${path} --> user_game data needed for foreign key`, async () => {
        const { body, statusCode } = await request(app).post(`${path}`)
        .send({
            userGameUserId: 0,
            result: "win"
        })
        // console.log(body)
        // console.log(statusCode)
        expect(statusCode).toEqual(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: "insert or update on table \"user_game_histories\" violates foreign key constraint \"user_game_histories_userGameUserId_fkey\""
            })
        )
    })

    test(`PUT ${path}${id} --> Success update data`, async () => {
        const { body, statusCode } = await request(app).put(`${path}${id}`)
        .send({
            userGameUserId: 1,
            result: "win"
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

    deleteUser()
})