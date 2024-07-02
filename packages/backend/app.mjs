import axios from 'axios';
import _ from 'lodash';
import { MALL_ADDR, RESPONSE_STATUS } from './constant.mjs';
import app from './expressApp.mjs';

let cookie = '';

app.post('/cookie', (req, res) => {
  cookie = req.body.cookie;

  res.send({
    status: RESPONSE_STATUS.SUCCESS,
    message: 'set cookie success',
  });
});

app.post('/search', async (req, res) => {
  const params = req.body;
  const { searchValue } = params;
  const otherParam = _.omit(params, ['searchValue']);
  try {
    const response = await axios.post(
      MALL_ADDR,
      { ...otherParam },
      { headers: { Cookie: cookie } }
    );

    if (response.data.code === 83001002) {
      res.send({
        status: RESPONSE_STATUS.UNAUTHORIZED,
        message: 'no auth',
      });
      return;
    }

    let { data } = response.data;
    if (searchValue) {
      const values = searchValue.split(' ');
      data.data = data.data.filter((good) =>
        values.some((value) => good.c2cItemsName.includes(value))
      );
    }

    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    res.send({
      status: RESPONSE_STATUS.SUCCESS,
      message: 'success',
      data,
    });
  } catch (e) {
    res.send({
      status: RESPONSE_STATUS.FAILED,
      message: 'unknown error',
    });
  }
});

app.listen('8088', () => {
  console.log(`Example app listening on port 8088`);
});
