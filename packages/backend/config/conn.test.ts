import pg from './pg.js'

void (async () => {
  try {
    const result = await pg.query('SELECT NOW()')
    console.log(result.rows)
  } finally {
    await pg.end()
  }
})()

