const { createEmployee, getEmployee } = require('../handlers');

afterEach(() => {
    jest.restoreAllMocks()
});

test('that email is required', async () => {
    const resp = await createEmployee({
        body: JSON.stringify({
            company: "Myfirm",
            firstName: "Jane",
            lastName: "Doe",
        })
    })
    expect(resp.statusCode).toBe(400);
});

test('that employee gets created', async () => {
    const dyanmoDbHelpers = require("../dynamoDbHelpers");
    dyanmoDbHelpers.putDoc = jest.fn(
        _ => ({
            promise: _ => Promise.resolve(true),
        })
    );

    let model = {
        email: "janedoe@example.com",
        company: "Myfirm",
        firstName: "Jane",
        lastName: "Doe",
    }
    const resp = await createEmployee({
        body: JSON.stringify(model),
    })

    expect(resp.statusCode).toBe(201);
    expect(dyanmoDbHelpers.putDoc.mock.calls.length).toBe(1)
    expect(resp.body).toEqual(expect.stringContaining("Myfirm"))
});

test('that employee gets returned', async () => {
    const model = {
        email: "janedoe@example.com",
        company: "Myfirm",
        firstName: "Jane",
        lastName: "Doe",
    }

    const dyanmoDbHelpers = require("../dynamoDbHelpers");
    dyanmoDbHelpers.scan = jest.fn(
        _ => ({
            promise: _ => Promise.resolve({
                Items: [
                    model,
                ]
            }),
        })
    );

    const resp = await getEmployee({
        body: JSON.stringify(model),
    })

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(expect.stringContaining("Myfirm"))
});
