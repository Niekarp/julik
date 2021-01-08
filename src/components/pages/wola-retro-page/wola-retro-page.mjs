export default Vue.component("wola-retro-page", {
  data: function() {
    return {
      audio_: new Audio(),
      elVideoOverlay_: null,
      elCoverOverlay_: null,

      selectedPiece: {},
      blanket: true,
      blanketDownTimeSec_: 0.8,

      mouseIsCalm: false,
      mouseMovedRecently_: false,
      TEXT_INACTIVATE_INTERVAL_: 10 * 1000,

      headerShowDelaySec: "5s",
      firstPieceShowDelaySec_: 6,
      pieceShowDelaySec_: 0.2,

      pieces: [],
      tmpPieces_: []
    }
  },
  methods: {    
    switchPiece: function(newPiece) {
      const ASSETS_URL = ASSETS_PATH;
      const SOUND_URL = `${ASSETS_URL}${newPiece.name}.${newPiece.ext}`.normalize("NFC");
      const COVER_URL = `${ASSETS_URL}${newPiece.cover}`.normalize("NFC");
    
      // pause media
      this.elVideoOverlay_.pause();
      this.audio_.pause();

      this.selectedPiece = newPiece;
   
      // fade out-in
      this.blanket = true;
      setTimeout(() => {
        if (COVER_URL !== ASSETS_URL) {
          // new piece is audio-only
          $(this.elCoverOverlay_).css("background-image", `url("${COVER_URL}")`);
          this.audio_ = new Audio(SOUND_URL);
          this.audio_.play();
        } else {
          // new piece is a video
          this.elVideoOverlay_.src = SOUND_URL;
          this.elVideoOverlay_.play();
        }
        this.blanket = false;
      }, this.blanketDownTimeSec_ * 1000);
    },

    getPieces_: function() {
      // TODO: maybe consider switching to using require.context
      // https://stackoverflow.com/questions/54059179/what-is-require-context
      return WOLA_SOUNDS
        .map((soundUrl, idx) => {
          const splitUrl = soundUrl.split(".");
          return {
            name: splitUrl[1].substring(1),
            ext:  splitUrl[2]
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
  },
  created: function() {
    const vm = this;

    $(document.documentElement).css("background-color", "black");
    $(document.documentElement).css("cursor", "default");

    $(document).on("mousemove", () => {
      vm.mouseMovedRecently_ = true;
      vm.mouseIsCalm = false;
    });
    
    setInterval(() => {
      if (!vm.mouseMovedRecently_) {
        vm.mouseIsCalm = true;
      }
      vm.mouseMovedRecently_ = false;
    }, vm.TEXT_INACTIVATE_INTERVAL_);

    vm.tmpPieces_ = vm.getPieces_();

    setTimeout(() => {
      let idx = 0;

      const addPieceInterval = setInterval(() => {
        if (idx >= vm.tmpPieces_.length) {
          clearInterval(addPieceInterval);
        } 
        else {
          vm.pieces.push(vm.tmpPieces_[idx++]);
        }
      }, vm.pieceShowDelaySec_ * 1000);

    }, vm.firstPieceShowDelaySec_ * 1000);
  },
  mounted: function() {
    this.elVideoOverlay_ = this.$refs.videoOverlay;
    this.elCoverOverlay_ = this.$refs.coverOverlay;

    this.switchPiece(this.tmpPieces_[6]);
  }
});
