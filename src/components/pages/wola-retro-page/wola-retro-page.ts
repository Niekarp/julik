import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class WolaRetroPage extends Vue {
  private audio_ = new Audio();
  private elVideoOverlay: any = null;
  private elCoverOverlay: any = null;

  public selectedPiece = {};
  public blanket = true;
  private blanketDownTimeSec = 0.8;

  public mouseIsCalm = false;
  public mouseMovedRecently = false;
  public TEXT_INACTIVATE_INTERVAL = 10 * 1000;

  public headerShowDelaySec = "5s";
  public firstPieceShowDelaySec = 6;
  public pieceShowDelaySec = 0.2;

  public pieces: any[] = [];
  public tmpPieces: any[] = [];

  private created() {
    const vm = this;

    $(document.documentElement).css("background-color", "black");
    $(document.documentElement).css("cursor", "default");

    $(document).on("mousemove", () => {
      vm.mouseMovedRecently = true;
      vm.mouseIsCalm = false;
    });

    setInterval(() => {
      if (!vm.mouseMovedRecently) {
        vm.mouseIsCalm = true;
      }
      vm.mouseMovedRecently = false;
    }, vm.TEXT_INACTIVATE_INTERVAL);

    vm.tmpPieces = vm.getPieces_();

    setTimeout(() => {
      let idx = 0;

      const addPieceInterval = setInterval(() => {
        if (idx >= vm.tmpPieces.length) {
          clearInterval(addPieceInterval);
        }
        else {
          vm.pieces.push(vm.tmpPieces[idx++]);
        }
      }, vm.pieceShowDelaySec * 1000);

    }, vm.firstPieceShowDelaySec * 1000);
  }

  private mounted() {
    this.elVideoOverlay = this.$refs.videoOverlay;
    this.elCoverOverlay = this.$refs.coverOverlay;

    this.switchPiece(this.tmpPieces[8]);
  }

  public switchPiece(newPiece: any) {
    const ASSETS_URL = ASSETS_PATH;
    const SOUND_URL = `${ASSETS_URL}${newPiece.name}.${newPiece.ext}`.normalize("NFC");
    const COVER_URL = `${ASSETS_URL}${newPiece.cover}`.normalize("NFC");

    // pause media
    this.elVideoOverlay.pause();
    this.audio_.pause();

    this.selectedPiece = newPiece;

    // fade out-in
    this.blanket = true;
    setTimeout(() => {
      if (COVER_URL !== ASSETS_URL) {
        // new piece is audio-only
        $(this.elCoverOverlay).css("background-image", `url("${COVER_URL}")`);
        this.audio_ = new Audio(SOUND_URL);
        this.audio_.play();
      } else {
        // new piece is a video
        this.elVideoOverlay.src = SOUND_URL;
        this.elVideoOverlay.play();
      }
      this.blanket = false;
    }, this.blanketDownTimeSec * 1000);
  }

  private getPieces_() {
  // TODO: maybe consider switching to using require.context
  // https://stackoverflow.com/questions/54059179/what-is-require-context
  return WOLA_SOUNDS
    .map((soundUrl, idx) => {
      const splitUrl = soundUrl.split(".");
      return {
        name: splitUrl[1].substring(1),
        ext: splitUrl[2],
        cover: ""
      };
    })
    .map(function addCover(piece) {
      const coverIdx = WOLA_COVERS.findIndex(coverUrl => coverUrl.includes(piece.name));
      if (coverIdx != -1) {
        piece.cover = WOLA_COVERS[coverIdx].substring(2);
      } else {
        piece.cover = "";
      }
      return piece;
    });
  }
}
