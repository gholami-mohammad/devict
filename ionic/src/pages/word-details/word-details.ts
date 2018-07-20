import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { TranslationSavePage } from '../translation-save/translation-save';
import { TranslationService } from '../../app/services/translation.service';
import * as _ from 'lodash';
import { LoadingService } from '../../app/services/loading.service';
import { Clipboard } from '@ionic-native/clipboard';

@IonicPage()
@Component({
  selector: 'page-word-details',
  templateUrl: 'word-details.html',
  providers: [TranslationService, LoadingService]
})
export class WordDetailsPage implements OnInit {
  word: any = null;
  basicInfo: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public translationService: TranslationService,
    public events: Events,
    public loading: LoadingService,
    public clipboard: Clipboard,
    public toasCtrl: ToastController) {
    this.word = this.navParams.get('word');
    if (this.word == null) {
      this.navCtrl.pop();
    }

    this.basicInfo = this.navParams.get('basicInfo');

    this.events.subscribe('translation:save', translation => {
      let i = _.findIndex(this.word.translations, item => {
        return item.id == translation.id;
      })

      if (i == -1) {
        return;
      }

      this.word.translations[i] = translation;
    });
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  /**
   * Call translation from page to create on update a translation
   * @param translation any If you want to add a new translation, pass null otherwise
   * If you want edit an existing translation, pass translation object with ID
   */
  translationSave(translation: any = null){
    this.navCtrl.push(TranslationSavePage, {
      translation: translation,
      word: this.word,
      basicInfo: this.basicInfo,
    });
  }

  /**
   * Handle swip left and swip right
   * @param e event
   */
  handleSwipe(e: any){
    if (e.direction == 2) {
      this.nextItem();
      return;
    }

    if (e.direction == 4) {
      this.previousItem();
      return;
    }

  }

  /**
   * Load next word in phrasebook
   */
  nextItem() {
    this.loading.show();
    this.navCtrl.pop();
    this.events.publish('word:next', this.word.index);
    this.loading.hide();
  }

  /**
   * Load next word in phrasebook
   */
  previousItem() {
    this.loading.show();
    this.navCtrl.pop();
    this.events.publish('word:previous', this.word.index);
    this.loading.hide();
  }

  /**
   * Copy word to clipboard
   */
  copyToClipboard() {
    let node = document.getElementById('the_word');

    if (document.body['createTextRange']) {
        const range = document.body['createTextRange']();
        range.moveToElementText(node);
        range.select();
        document.execCommand('copy');
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    } else {
        this.toasCtrl.create({
          message: 'Unable to copy text! Please do it manualy.',
          duration: 2000,
        }).present();
        return
    }

    this.toasCtrl.create({
      message: "Copied!",
      duration: 1000,
    }).present();

  }

}
