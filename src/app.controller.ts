import { Controller, Get, Render } from '@nestjs/common';
import { SafeString } from 'hbs';

const table = () => {
  let data = '<tr>';
  for (let i = 0; i <= 10; i++) {
    data += `<td></td>`;
  }
  data += `</tr>`;
  return data;
};

const table2 = () => {
  let total = '';
  for (let i = 0; i <= 10; i++) {
    total += table();
  }
  return total;
};

@Controller()
export class AppController {
  @Get()
  @Render('index')
  renderIndex() {
    return {
      helpers: {
        teste() {
          return new SafeString(`<table cellspacing="0">
          ${table2()}
        </table>`);
        },
      },
    };
  }
}
