const { test, expect } = require('@playwright/test');

const BASE = 'https://reqres.in';
const headers = process.env.REQRES_API_KEY
  ? { 'x-api-key': process.env.REQRES_API_KEY }
  : {};

test.describe.serial('reqres.in user API', () => {
  let userId;
  const name = 'morpheus';
  const job = 'leader';

  test('create user returns 201 and stores id', async ({ request }) => {
    const res = await request.post(`${BASE}/api/users`, { headers, data: { name, job } });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe(name);
    expect(body.job).toBe(job);
    expect(body.id).toBeTruthy();
    userId = String(body.id);
    console.log(`Created user id: ${userId}`);
  });

  test('get user details', async ({ request }) => {
    const created = await request.get(`${BASE}/api/users/${userId}`, { headers });
    expect([200, 404]).toContain(created.status());
    if (created.status() === 200) {
      expect(String((await created.json()).data.id)).toBe(userId);
    }

    const seeded = await request.get(`${BASE}/api/users/2`, { headers });
    expect(seeded.status()).toBe(200);
    expect((await seeded.json()).data.id).toBe(2);
  });

  test('update user name', async ({ request }) => {
    const newName = 'neo';
    const res = await request.put(`${BASE}/api/users/${userId}`, {
      headers,
      data: { name: newName, job },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe(newName);
    expect(body.job).toBe(job);
    expect(body.updatedAt).toBeTruthy();
  });
});
