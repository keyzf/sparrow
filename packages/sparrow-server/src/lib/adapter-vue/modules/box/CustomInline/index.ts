import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';

export default class CustomInline implements IBaseBox{
  $fragment: any;
  components: any = [];
  type: string = 'inline';
  previewType: number = 0;
  boxIndex: number;

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.boxIndex = boxIndex;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex, `<custom-inline></custom-inline>`, '内联'), {
      xmlMode: true,
      decodeEntities: false
    });
  }

  public addComponent (data) {
    const { key, type } = data;
    const dynamicObj = require(`../../component/BasicTable/${key}`).default;
    this.components.push(new dynamicObj(type));
    this.renderTemplate();
  }

  public renderTemplate () {
    this.$fragment('custom-inline').empty();
    this.components.forEach(item => {
      if (this.previewType === 0) {
        this.$fragment('custom-inline').append(item.fragment())
      } else {
        this.$fragment('.custom-inline').append(item.fragment())
      }
    });
  }


  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public setPreview (type: number = 0) {
    if (this.previewType === type) {
      return;
    } else {
      this.previewType = type;
    }
    if (type === 0) {
      this.$fragment = cheerio.load(boxFragment.box(this.boxIndex, `<custom-inline></custom-inline>`, '内联'), {
        xmlMode: true,
        decodeEntities: false
      });
      this.renderTemplate();
    } else {
      this.$fragment = cheerio.load(`<div class="custom-inline"></div>`, {
        xmlMode: true,
        decodeEntities: false
      });
      this.renderTemplate();
    }

  }

}