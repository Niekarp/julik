import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class WolaRetroPage extends Vue {
  private audio_ = new Audio();
  private pieceChanges = false;
  private elVideoOverlay: any = null;
  private elCoverOverlay: any = null;
  private elCoverOverlayImgSrc: string = "";

  public selectedPiece = {};
  public blanket = true;
  private blanketDownTimeSec = 1.5;

  public mouseIsCalm = false;
  public mouseMovedRecently = false;
  public TEXT_INACTIVATE_INTERVAL = 10 * 1000;

  public headerShowDelaySec = "5s";
  public firstPieceShowDelaySec = 6;
  public pieceShowDelaySec = 0.2;

  public piecesOlaf: any[] = [];
  public piecesOlo: any[] = [];
  public pieces: any[] = [];
  public tmpPieces: any[] = [];
  public piecesLoaded = false;
  public artist = "Olaf";

  private created() {
    $(document.documentElement).css("background-color", "black");
    $(document.documentElement).css("cursor", "default");

    $(document).on("mousemove", () => {
      // set flags that cursor moved
      this.mouseMovedRecently = true;
      this.mouseIsCalm = false;
    });

    setInterval(() => {
      // periodically check if cursor moved within some time window
      if (!this.mouseMovedRecently) {
        this.mouseIsCalm = true;
      }
      this.mouseMovedRecently = false;
    }, this.TEXT_INACTIVATE_INTERVAL);

    this.piecesOlaf = this.getPieces(WOLA_SOUNDS_OLAF, WOLA_COVERS_OLAF);
    this.piecesOlo  = this.getPieces(WOLA_SOUNDS_OLO,  WOLA_COVERS_OLO);
    this.tmpPieces  = this.piecesOlaf;

    this.showPiecesOneByOne(this.tmpPieces, this.firstPieceShowDelaySec * 1000);
  }

  private mounted() {
    this.elVideoOverlay = this.$refs.videoOverlay;
    this.elCoverOverlay = this.$refs.coverOverlay;

    this.switchPiece(this.tmpPieces[8]);
  }

  public switchPlayer() {
    if (!this.piecesLoaded) return;

    this.blanketDownMediaOff(500).then(_ => {
      this.hidePiecesOneByOne(this.pieces).then(_ => {
        if (this.artist === "Olaf") {
          this.artist = "Olo";
          (new Audio("./assets/bark.wav")).play();
  
          this.showPiecesOneByOne(this.piecesOlo, 1500).then(_ => {
            this.switchPiece(this.pieces[2]);
          });
        } else {
          this.artist = "Olaf";
          this.showPiecesOneByOne(this.piecesOlaf, 1500).then(_ => {
            this.switchPiece(this.pieces[8]);
          });
        }
      });
    });
  }

  public switchPiece(newPiece: any) {
    if (this.pieceChanges) return;
    this.pieceChanges = true;

    const ASSETS_URL = ASSETS_PATH;
    const SOUND_URL = `${ASSETS_URL}${newPiece.filename}.${newPiece.ext}`.normalize("NFC");
    const COVER_URL = `${ASSETS_URL}${newPiece.cover}`.normalize("NFC");

    this.selectedPiece = newPiece;   

    this.blanketDownMediaOff(this.blanketDownTimeSec * 1000).then(_ => {

      if (COVER_URL !== ASSETS_URL) {
        // new piece is audio-only

        fetch(COVER_URL).then(response => response.blob()
                        .then(blob => {
            var objectURL = URL.createObjectURL(blob);

            $('<img/>').attr('src', objectURL).on('load', (element) => {
              $(element).remove();
              // $(this).remove(); // prevent memory leaks as @benweet suggested
              // console.log("setting image");
              this.elCoverOverlayImgSrc = objectURL;
              // $(this.elCoverOverlay).css("background-image", `url("${objectURL}")`);
              this.audio_ = new Audio(SOUND_URL);

              setTimeout(() => {
                this.blanket = false;
                this.audio_.play();
                this.pieceChanges = false;
              }, 1000)
            });;
        })).catch(_ => this.pieceChanges = false);
      } 
      else {
        // new piece is a video
        this.elVideoOverlay.src = SOUND_URL;

        setTimeout(() => {
          this.blanket = false;
          this.elVideoOverlay.play();
          this.pieceChanges = false;
        }, 2000);
      }
      
    })
  }

  private blanketDownMediaOff(duration: number) {
    // pause media
    this.elVideoOverlay.pause();
    this.audio_.pause();

    // fade out-in
    this.blanket = true;

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(null); }, duration);
    });
  }

  private showPiecesOneByOne(piecesToShow: any[], firstPieceDelay: number) {
    this.piecesLoaded = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // insert pieces one by one with pauses in between
        let idx = 0;
  
        const addPieceInterval = setInterval(() => {
          if (idx >= piecesToShow.length) {
            clearInterval(addPieceInterval);
            this.piecesLoaded = true;
            resolve(null);
          }
          else {
            this.pieces.push(piecesToShow[idx++]);
          }
        }, this.pieceShowDelaySec * 1000);
  
      }, firstPieceDelay);
    });
  }

  private hidePiecesOneByOne(piecesToHide: any[]) {
    this.piecesLoaded = false;

    return new Promise((resolve, reject) => {
      // insert pieces one by one with pauses in between
      let idx = 0;

      const removePieceInterval = setInterval(() => {
        if (piecesToHide.length) {
          piecesToHide.pop();
        }
        else {
          clearInterval(removePieceInterval);
          this.piecesLoaded = true;
          resolve(null);
        }
      }, this.pieceShowDelaySec * 1000);
    });
  }

  private getPieces(soundsUrl: string[], coversUrl: string[]) {
  // TODO: maybe consider switching to using require.context
  // https://stackoverflow.com/questions/54059179/what-is-require-context
  return soundsUrl
    .map((soundUrl, idx) => {
      const splitUrl = soundUrl.split(".");
      const splitNameAndIdx = splitUrl[1].split(" ");
      return {
        idx:      splitNameAndIdx[0].substr(1),
        name:     splitNameAndIdx.slice(1).join(" "),
        filename: splitNameAndIdx.join(" ").substr(1),
        ext:      splitUrl[2],
        cover: ""
      };
    })
    .map(function addCover(piece) {
      const coverIdx = coversUrl.findIndex(coverUrl => coverUrl.includes(piece.name));
      if (coverIdx != -1) {
        piece.cover = coversUrl[coverIdx].substring(2);
      } else {
        piece.cover = "";
      }
      return piece;
    });
  }
}
