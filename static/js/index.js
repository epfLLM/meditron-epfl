window.HELP_IMPROVE_VIDEOJS = false;

var IMG_EXT = '.webp';

var MM_RGB2ALL_BASE = "https://storage.googleapis.com/four_m_site/images/rgb-to-all";
var MM_RGB2ALL_NUM_IMGS = 138;
var mm_rgb2all_img_idx = 0;

var MM_GUIDANCE_BASE = "https://storage.googleapis.com/four_m_site/images/multimodal_guidance";
var MM_GUIDANCE_NUM_FRAMES = 100;
var MM_GUIDANCE_NUM_IMGS = 6;
var mm_guidance_img_idx = 0;

var BBOX_PROBING_BASE = "https://storage.googleapis.com/four_m_site/images/bbox_probing";
var BBOX_PROBING_NUM_FRAMES = 100;
var BBOX_PROBING_NUM_IMGS = 4;
var bbox_probing_img_idx = 0;

var SEMSEG_MANIPULATION_BASE = "https://storage.googleapis.com/four_m_site/images/semseg_manipulation";
var SEMSEG_MANIPULATION_NUM_FRAMES = 4;
var SEMSEG_MANIPULATION_NUM_IMGS = 5;
var semseg_manipulation_img_idx = 0;

var RGB2ANY_RETRIEVAL_BASE = "https://storage.googleapis.com/four_m_site/images/rgb2any_retrieval";
var RGB2ANY_RETRIEVAL_NUM_MODALITIES = 4;
var RGB2ANY_RETRIEVAL_NUM_IMGS = 10;
var rgb2any_retrieval_img_idx = 7;
var RGB2ANY_RETRIEVAL_MODALITIES = [
  'RGB',
  'Depth',
  'Normals',
  'Semantic',
]

var TOK_BASE = "https://storage.googleapis.com/four_m_site/images/tokenizer";
var TOK_NUM_IMGS = 4;
var tok_img_idx = 0;

var ANY2RGB_RETRIEVAL_BASE = "https://storage.googleapis.com/four_m_site/images/any2rgb_retrieval";
var ANY2RGB_RETRIEVAL_NUM_MODALITIES = 5;
var ANY2RGB_RETRIEVAL_NUM_IMGS = 10;
var any2rgb_retrieval_img_idx = 2;
var ANY2RGB_RETRIEVAL_MODALITIES = [
  'Depth',
  'Normals',
  'Semantic',
  'Caption',
  'RGB',
]

// var HUE_INTERP_BASE = "https://storage.googleapis.com/multimae_bucket/images/hue";
// var HUE_NUM_FRAMES = 360;
// var HUE_NUM_IMGS = 7;
// var hue_img_idx = 0;

// var PROGMASK_BASE = "https://storage.googleapis.com/multimae_bucket/images/progmask";
// var PROGMASK_NUM_FRAMES = 589;

// var MODRATIO_BASE = "https://storage.googleapis.com/multimae_bucket/images/modratio";
// var MODRATIO_NUM_FRAMES = 294;

// var RANDMASKS_BASE = "https://storage.googleapis.com/multimae_bucket/images/rand_masks";
// var RANDMASKS_NUM_IMGS = 26;
// var RANDMASKS_NUM_SAMPLES = 20;
// var randmasks_img_idx = 0;
// var randmasks_sample_idx = 0;


var mm_guidance_imgs_rgb_pred = [];
function preloadMultimodalGuidanceImages(img_idx) {
  for (var i = 0; i < MM_GUIDANCE_NUM_FRAMES; i++) {
    var pred_path = MM_GUIDANCE_BASE + '/' + String(img_idx) + '/' + String(i) + IMG_EXT;
    mm_guidance_imgs_rgb_pred[i] = new Image();
    mm_guidance_imgs_rgb_pred[i].src = pred_path;
  }
}

var bbox_probing_imgs_rgb_pred = [];
var bbox_probing_imgs_bbox_input = [];
function preloadBboxProbingImages(img_idx) {
  for (var i = 0; i < BBOX_PROBING_NUM_FRAMES; i++) {
    var pred_path = BBOX_PROBING_BASE + '/' + String(img_idx) + '/rgb_pred/' + String(i) + IMG_EXT;
    bbox_probing_imgs_rgb_pred[i] = new Image();
    bbox_probing_imgs_rgb_pred[i].src = pred_path;

    var cond_path = BBOX_PROBING_BASE + '/' + String(img_idx) + '/bbox_input/' + String(i) + IMG_EXT;
    bbox_probing_imgs_bbox_input[i] = new Image();
    bbox_probing_imgs_bbox_input[i].src = cond_path;
  }
}

var semseg_manipulation_imgs_rgb_pred = [];
var semseg_manipulation_imgs_semseg_input = [];
function preloadSemsegManipulationImages(img_idx) {
  for (var i = 0; i < SEMSEG_MANIPULATION_NUM_FRAMES; i++) {
    var pred_path = SEMSEG_MANIPULATION_BASE + '/' + String(img_idx) + '/rgb_pred/' + String(i) + IMG_EXT;
    semseg_manipulation_imgs_rgb_pred[i] = new Image();
    semseg_manipulation_imgs_rgb_pred[i].src = pred_path;

    var cond_path = SEMSEG_MANIPULATION_BASE + '/' + String(img_idx) + '/semseg_input/' + String(i) + IMG_EXT;
    semseg_manipulation_imgs_semseg_input[i] = new Image();
    semseg_manipulation_imgs_semseg_input[i].src = cond_path;
  }
}



function setMultimodalGuidanceImage(i) {
  // i can be from -1.00 to 2.00. Scale to 0-99
  var idx = Math.round(99.0 * (parseFloat(i)+1.0)/3.0);
  var image_pred = mm_guidance_imgs_rgb_pred[idx];
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };
  $('#mmguidance-wrapper-pred').empty().append(image_pred);
}

function setBboxProbingImage(i) {
  var image_cond = bbox_probing_imgs_bbox_input[i];
  image_cond.ondragstart = function() { return false; };
  image_cond.oncontextmenu = function() { return false; };
  $('#bboxprobing-bbox-input').empty().append(image_cond);

  var image_pred = bbox_probing_imgs_rgb_pred[i];
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };
  $('#bboxprobing-wrapper-pred').empty().append(image_pred);
}

function setSemsegManipulationImage(i) {
  var image_cond = semseg_manipulation_imgs_semseg_input[i];
  image_cond.ondragstart = function() { return false; };
  image_cond.oncontextmenu = function() { return false; };
  $('#semsegmanipulation-semseg-input').empty().append(image_cond);

  var image_pred = semseg_manipulation_imgs_rgb_pred[i];
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };
  $('#semsegmanipulation-wrapper-pred').empty().append(image_pred);
}

function setSpecificRGB2AllImage(img_idx) {
  console.log(img_idx)
  var path = MM_RGB2ALL_BASE + '/' + String(img_idx) + '/plot.svg'; 
  document.getElementById('rgb2allFrame').src = path
}

function setSpecificMultimodalGuidanceImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var idx = Math.round(99.0 * (parseFloat(i)+1.0)/3.0);
  var pred_path = MM_GUIDANCE_BASE + '/' + String(img_idx) + '/' + String(idx) + IMG_EXT;
  var image_pred = new Image();
  image_pred.onload = function() {
    $('#mmguidance-wrapper-pred').empty().append(image_pred);
  }
  image_pred.src = pred_path;
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };
}

function setSpecificBboxProbingImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var pred_path = BBOX_PROBING_BASE + '/' + String(img_idx) + '/rgb_pred/' + String(i) + IMG_EXT;
  var image_pred = new Image();
  image_pred.onload = function() {
    $('#bboxprobing-wrapper-pred').empty().append(image_pred);
  }
  image_pred.src = pred_path;
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };

  var cond_path = BBOX_PROBING_BASE + '/' + String(img_idx) + '/bbox_input/' + String(i) + IMG_EXT;
  var image_cond = new Image();
  image_cond.onload = function() {
    $('#bboxprobing-bbox-input').empty().append(image_cond);
  }
  image_cond.src = cond_path;
  image_cond.ondragstart = function() { return false; };
  image_cond.oncontextmenu = function() { return false; };
}

function setSpecificSemsegManipulationImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var pred_path = SEMSEG_MANIPULATION_BASE + '/' + String(img_idx) + '/rgb_pred/' + String(i) + IMG_EXT;
  var image_pred = new Image();
  image_pred.onload = function() {
    $('#semsegmanipulation-wrapper-pred').empty().append(image_pred);
  }
  image_pred.src = pred_path;
  image_pred.ondragstart = function() { return false; };
  image_pred.oncontextmenu = function() { return false; };

  var cond_path = SEMSEG_MANIPULATION_BASE + '/' + String(img_idx) + '/semseg_input/' + String(i) + IMG_EXT;
  var image_cond = new Image();
  image_cond.onload = function() {
    $('#semsegmanipulation-semseg-input').empty().append(image_cond);
  }
  image_cond.src = cond_path;
  image_cond.ondragstart = function() { return false; };
  image_cond.oncontextmenu = function() { return false; };
}

function setSpecificRgb2AnyRetrivialImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var orig_path = RGB2ANY_RETRIEVAL_BASE + '/' + String(img_idx) + '/orig_rgb/' + String(0) + IMG_EXT;
  var image_orig = new Image();
  image_orig.onload = function() {
    $('#rgb2any-retrieval-rgb-input').empty().append(image_orig);
  }
  image_orig.src = orig_path;
  image_orig.ondragstart = function() { return false; };
  image_orig.oncontextmenu = function() { return false; };


  var retrieved_path = RGB2ANY_RETRIEVAL_BASE + '/' + String(img_idx) + '/retrieved/' + String(i) + IMG_EXT;
  var image_retrieved = new Image();
  image_retrieved.onload = function() {
    $('#rgb2any-retrieval-wrapper-pred').empty().append(image_retrieved);
  }
  image_retrieved.src = retrieved_path;
  image_retrieved.ondragstart = function() { return false; };
  image_retrieved.oncontextmenu = function() { return false; };

  $('#rgb2any-retreival-modality').empty().append(RGB2ANY_RETRIEVAL_MODALITIES[i]);
}

function setSpecificAny2RgbRetrivialImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var query_path = ANY2RGB_RETRIEVAL_BASE + '/' + String(img_idx) + '/query/' + String(i) + IMG_EXT;
  var image_query = new Image();
  image_query.onload = function() {
    $('#any2rgb-retrieval-query').empty().append(image_query);
  }
  image_query.src = query_path;
  image_query.ondragstart = function() { return false; };
  image_query.oncontextmenu = function() { return false; };

  var retrieved_path = ANY2RGB_RETRIEVAL_BASE + '/' + String(img_idx) + '/rgb_retrieved/' + String(i) + IMG_EXT;
  var image_retrieved = new Image();
  image_retrieved.onload = function() {
    $('#any2rgb-retrieval-rgb-retrieval').empty().append(image_retrieved);
  }
  image_retrieved.src = retrieved_path;
  image_retrieved.ondragstart = function() { return false; };
  image_retrieved.oncontextmenu = function() { return false; };

  $('#any2rgb-retrieval-query-modality').empty().append(ANY2RGB_RETRIEVAL_MODALITIES[i]);
}

function setSpecificAny2RgbRetrivialImage(img_idx, i) {
  // To avoid flicker, we do it this way when next image is requested
  var query_path = ANY2RGB_RETRIEVAL_BASE + '/' + String(img_idx) + '/query/' + String(i) + IMG_EXT;
  var image_query = new Image();
  image_query.onload = function() {
    $('#any2rgb-retrieval-query').empty().append(image_query);
  }
  image_query.src = query_path;
  image_query.ondragstart = function() { return false; };
  image_query.oncontextmenu = function() { return false; };

  var retrieved_path = ANY2RGB_RETRIEVAL_BASE + '/' + String(img_idx) + '/rgb_retrieved/' + String(i) + IMG_EXT;
  var image_retrieved = new Image();
  image_retrieved.onload = function() {
    $('#any2rgb-retrieval-rgb-retrieval').empty().append(image_retrieved);
  }
  image_retrieved.src = retrieved_path;
  image_retrieved.ondragstart = function() { return false; };
  image_retrieved.oncontextmenu = function() { return false; };

  $('#any2rgb-retrieval-query-modality').empty().append(ANY2RGB_RETRIEVAL_MODALITIES[i]);
}

function setMultimodalGuidanceGTImages(img_idx) {
  var path = MM_GUIDANCE_BASE + '/' + String(img_idx) + '_depth' + IMG_EXT;
  var img1 = new Image();
  img1.onload = function() {
    $('#mmguidance-depth-input').empty().append(img1);
  }
  img1.src = path;

  var path = MM_GUIDANCE_BASE + '/' + String(img_idx) + '_caption' + IMG_EXT;
  var img2 = new Image();
  img2.onload = function() {
    $('#mmguidance-caption-input').empty().append(img2);
  }
  img2.src = path;
}

function setBboxProbingGTImages(img_idx) {
  var path = BBOX_PROBING_BASE + '/' + String(img_idx) + '/caption_input' + IMG_EXT;
  var img = new Image();
  img.onload = function() {
    $('#bboxprobing-caption-input').empty().append(img);
  }
  img.src = path;
}

function setSpecificTokImage(img_idx) {
  const paths = ['gt', 'vqvae', 'vqgan-lpips', 'vqgan-clip', 'diffusion', 'controlnet'];
  const images = [null, null, null, null, null, null];
  for (let i = 0; i < paths.length; i++) {
    var orig_path = TOK_BASE + '/' + paths[i] + '/' + String(img_idx + 1) + IMG_EXT;

    images[i] = new Image();
    images[i] .onload = function() {
      $('#tok-' + paths[i]).empty().append(images[i]);
    }
    images[i] .src = orig_path;
    images[i] .ondragstart = function() { return false; };
    images[i] .oncontextmenu = function() { return false; };
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function prevRGB2AllImage() {
  mm_rgb2all_img_idx = mod(mm_rgb2all_img_idx - 1, MM_RGB2ALL_NUM_IMGS);
  setSpecificRGB2AllImage(mm_rgb2all_img_idx);
}

function nextRGB2AllImage() {
  mm_rgb2all_img_idx = (mm_rgb2all_img_idx + 1) % MM_RGB2ALL_NUM_IMGS;
  setSpecificRGB2AllImage(mm_rgb2all_img_idx);
}

function prevMultimodalGuidanceImage() {
  mm_guidance_img_idx = mod(mm_guidance_img_idx - 1, MM_GUIDANCE_NUM_IMGS);
  setMultimodalGuidanceGTImages(mm_guidance_img_idx);
  preloadMultimodalGuidanceImages(mm_guidance_img_idx);
  setSpecificMultimodalGuidanceImage(mm_guidance_img_idx, $('#mmguidance-slider').prop('value'));
}

function nextMultimodalGuidanceImage() {
  mm_guidance_img_idx = (mm_guidance_img_idx + 1) % MM_GUIDANCE_NUM_IMGS;
  setMultimodalGuidanceGTImages(mm_guidance_img_idx);
  preloadMultimodalGuidanceImages(mm_guidance_img_idx);
  setSpecificMultimodalGuidanceImage(mm_guidance_img_idx, $('#mmguidance-slider').prop('value'));
}

function prevBboxProbingImage() {
  bbox_probing_img_idx = mod(bbox_probing_img_idx - 1, BBOX_PROBING_NUM_IMGS);
  setBboxProbingGTImages(bbox_probing_img_idx);
  preloadBboxProbingImages(bbox_probing_img_idx);
  setSpecificBboxProbingImage(bbox_probing_img_idx, $('#bboxprobing-slider').prop('value'));
}

function nextBboxProbingImage() {
  bbox_probing_img_idx = (bbox_probing_img_idx + 1) % BBOX_PROBING_NUM_IMGS;
  setBboxProbingGTImages(bbox_probing_img_idx);
  preloadBboxProbingImages(bbox_probing_img_idx);
  setSpecificBboxProbingImage(bbox_probing_img_idx, $('#bboxprobing-slider').prop('value'));
}

function prevSemsegManipulationImage() {
  semseg_manipulation_img_idx = mod(semseg_manipulation_img_idx - 1, SEMSEG_MANIPULATION_NUM_IMGS);
  // setSemsegManipulationGTImages(semseg_manipulation_img_idx);
  preloadSemsegManipulationImages(semseg_manipulation_img_idx);
  setSpecificSemsegManipulationImage(semseg_manipulation_img_idx, $('#semsegmanipulation-slider').prop('value'));
}

function nextSemsegManipulationImage() {
  semseg_manipulation_img_idx = (semseg_manipulation_img_idx + 1) % SEMSEG_MANIPULATION_NUM_IMGS;
  // setSemsegManipulationGTImages(semseg_manipulation_img_idx);
  preloadSemsegManipulationImages(semseg_manipulation_img_idx);
  setSpecificSemsegManipulationImage(semseg_manipulation_img_idx, $('#semsegmanipulation-slider').prop('value'));
}

function prevRgb2AnyRetrievalImage() {
  rgb2any_retrieval_img_idx = mod(rgb2any_retrieval_img_idx - 1, RGB2ANY_RETRIEVAL_NUM_IMGS);
  setSpecificRgb2AnyRetrivialImage(rgb2any_retrieval_img_idx, $('#rgb2any-retrieval-slider').prop('value'));
}

function nextRgb2AnyRetrievalImage() {
  rgb2any_retrieval_img_idx = (rgb2any_retrieval_img_idx + 1) % RGB2ANY_RETRIEVAL_NUM_IMGS;
  setSpecificRgb2AnyRetrivialImage(rgb2any_retrieval_img_idx, $('#rgb2any-retrieval-slider').prop('value'));
}

function prevTokImage() {
  tok_img_idx = mod(tok_img_idx - 1, TOK_NUM_IMGS);
  setSpecificTokImage(tok_img_idx);
}

function nextTokImage() {
  tok_img_idx = (tok_img_idx + 1) % TOK_NUM_IMGS;
  setSpecificTokImage(tok_img_idx);
}

function prevTokImage() {
  tok_img_idx = mod(tok_img_idx - 1, TOK_NUM_IMGS);
  setSpecificTokImage(tok_img_idx);
}

function nextTokImage() {
  tok_img_idx = (tok_img_idx + 1) % TOK_NUM_IMGS;
  setSpecificTokImage(tok_img_idx);
}

function prevAny2RgbRetrievalImage() {
  any2rgb_retrieval_img_idx = mod(any2rgb_retrieval_img_idx - 1, ANY2RGB_RETRIEVAL_NUM_IMGS);
  setSpecificAny2RgbRetrivialImage(any2rgb_retrieval_img_idx, $('#any2rgb-retrieval-slider').prop('value'));
}

function nextAny2RgbRetrievalImage() {
  any2rgb_retrieval_img_idx = (any2rgb_retrieval_img_idx + 1) % ANY2RGB_RETRIEVAL_NUM_IMGS;
  setSpecificAny2RgbRetrivialImage(any2rgb_retrieval_img_idx, $('#any2rgb-retrieval-slider').prop('value'));
}


function restartVideo(videoID) {
  var video = document.getElementById(videoID);
  video.currentTime = 0;
  video.play();
}

function playPauseVideo(videoID) {
  var video = document.getElementById(videoID);
  if (video.currentTime > video.duration - 0.1) {
    video.currentTime = 0;
    video.play();
  } else if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


$(document).ready(function() {

    // Multimodal guidance slider
    preloadMultimodalGuidanceImages(mm_guidance_img_idx);
    setMultimodalGuidanceGTImages(mm_guidance_img_idx);
    $('#mmguidance-slider').on('input', function(event) {
      setMultimodalGuidanceImage(this.value);
    });
    setMultimodalGuidanceImage(0.48);
    $('#mmguidance-slider').prop('max', 2.00);
    bulmaSlider.attach();

    // Bbox probing slider
    preloadBboxProbingImages(bbox_probing_img_idx);
    setBboxProbingGTImages(bbox_probing_img_idx);
    $('#bboxprobing-slider').on('input', function(event) {
      setBboxProbingImage(this.value);
    });
    setBboxProbingImage(0);
    $('#bboxprobing-slider').prop('max', BBOX_PROBING_NUM_FRAMES - 1);
    bulmaSlider.attach();

    // Semantic manipulation slider
    preloadSemsegManipulationImages(semseg_manipulation_img_idx);
    $('#semsegmanipulation-slider').on('input', function(event) {
      setSpecificSemsegManipulationImage(semseg_manipulation_img_idx, this.value);
    });
    setSemsegManipulationImage(0);
    $('#semsegmanipulation-slider').prop('max', SEMSEG_MANIPULATION_NUM_FRAMES - 1);
    bulmaSlider.attach();

    // RGB2ANY Retrieval slider
    $('#rgb2any-retrieval-slider').on('input', function(event) {
      setSpecificRgb2AnyRetrivialImage(rgb2any_retrieval_img_idx, this.value);
    });
    setSpecificRgb2AnyRetrivialImage(7, 0);
    $('#rgb2any-retrieval-slider').prop('max', RGB2ANY_RETRIEVAL_NUM_MODALITIES - 1);
    bulmaSlider.attach();

    // ANY2RGB Retrieval slider
    $('#any2rgb-retrieval-slider').on('input', function(event) {
      setSpecificAny2RgbRetrivialImage(any2rgb_retrieval_img_idx, this.value);
    });
    setSpecificAny2RgbRetrivialImage(2, 0);
    $('#any2rgb-retrieval-slider').prop('max', ANY2RGB_RETRIEVAL_NUM_MODALITIES - 1);
    bulmaSlider.attach();

    // Tokenizer reconstructions
    setSpecificTokImage(0);


    const dataAblationRGB2X = {
      labels: [
        'RGB â†’ RGB', 'RGB â†’ CLIP', 'RGB â†’ Semantic', 'RGB â†’ Geometric', 'RGB â†’ All'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
          'rgba(52, 160, 164, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
          'rgb(52, 160, 164)',
        ],
        borderWidth: 1,
        data: [5.49, 5.36, 5.35, 5.32, 5.29],
        barPercentage: 0.5,
      }]
    };

    const dataAblationAll2X = {
      labels: [
        'All â†’ RGB', 'All â†’ CLIP', 'All â†’ Semantic', 'All â†’ Geometric', 'All â†’ All'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
          'rgba(52, 160, 164, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
          'rgb(52, 160, 164)',
        ],
        borderWidth: 1,
        data: [5.42, 5.42, 5.39, 5.36, 5.36],
        barPercentage: 0.5,
      }]
    };


    const dataAblationAlphas = {
      labels: [
        '0.1', '0.2', '0.5', '1.0', 'âˆž'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
          'rgba(52, 160, 164, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
          'rgb(52, 160, 164)',
        ],
        borderWidth: 1,
        data: [5.43, 5.36, 5.33, 5.32, 5.34],
        barPercentage: 0.5,
      }]
    };

    const dataAblationInputTokens = {
      labels: [
        '64', '128', '256', '512'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
        ],
        borderWidth: 1,
        data: [5.50, 5.36, 5.32, 5.38],
        barPercentage: 0.5,
      }]
    };

    const dataAblationTargetTokens = {
      labels: [
        '64', '128', '256', '512'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
        ],
        borderWidth: 1,
        data: [5.36, 5.36, 5.43, 5.48],
        barPercentage: 0.5,
      }]
    };


    const dataScalingDataset = {
      labels: [
        '164k', '656k', '2.6M', '10.5M'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
        ],
        borderWidth: 2,
        data: [5.51, 5.44, 5.39, 5.36],
        barPercentage: 0.5,
      }]
    };

    const dataScalingTokens = {
      labels: [
        '50B', '100B', '200B', '400B'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
        ],
        borderWidth: 2,
        data: [5.46, 5.36, 5.29, 5.25],
        barPercentage: 0.5,
      }]
    };

    const dataScalingModel = {
      labels: [
        '4M-Ti', '4M-S', '4M-B', '4M-L'
      ],
      datasets: [{
        backgroundColor: [
          'rgba(181, 228, 140, 0.2)',
          'rgba(153, 217, 140, 0.2)',
          'rgba(118, 200, 147, 0.2)',
          'rgba(82, 182, 154, 0.2)',
        ],
        borderColor: [
          'rgb(181, 228, 140)',
          'rgb(153, 217, 140)',
          'rgb(118, 200, 147)',
          'rgb(82, 182, 154)',
        ],
        borderWidth: 2,
        data: [5.66, 5.51, 5.36, 5.23],
        barPercentage: 0.5,
      }]
    };


    const configAblationRGB2X = {
      type: 'bar',
      data: dataAblationRGB2X,
      options: {
        // scales: {y: {min: 5.2, max: 5.5}},
        scales: {
          x: {
            ticks: {
              font: {
                size: 9
              }
            }
          },
          y: {min: 5.2, max: 5.5}
        },
        plugins: {legend: {display: false}}
      }
    };

    const configAblationAll2X = {
      type: 'bar',
      data: dataAblationAll2X,
      options: {
        // scales: {y: {min: 5.2, max: 5.5}},
        scales: {
          x: {
            ticks: {
              font: {
                size: 9
              }
            }
          },
          y: {min: 5.2, max: 5.5}
        },
        plugins: {legend: {display: false}}
      }
    };


    const configAblationAlphas = {
      type: 'bar',
      data: dataAblationAlphas,
      options: {
        scales: {y: {min: 5.2, max: 5.6}},
        plugins: {legend: {display: false}}
      }
    };

    const configAblationInputTokens = {
      type: 'bar',
      data: dataAblationInputTokens,
      options: {
        scales: {y: {min: 5.2, max: 5.6}},
        plugins: {legend: {display: false}}
      }
    };

    const configAblationTargetTokens = {
      type: 'bar',
      data: dataAblationTargetTokens,
      options: {
        scales: {y: {min: 5.2, max: 5.6}},
        plugins: {legend: {display: false}}
      }
    };


    const configScalingDataset = {
      type: 'line',
      data: dataScalingDataset,
      options: {
        scales: {y: {min: 5.2, max: 5.7}},
        plugins: {legend: {display: false}}
      }
    };

    const configScalingTokens = {
      type: 'line',
      data: dataScalingTokens,
      options: {
        scales: {y: {min: 5.2, max: 5.7}},
        plugins: {legend: {display: false}}
      }
    };

    const configScalingModel = {
      type: 'line',
      data: dataScalingModel,
      options: {
        scales: {y: {min: 5.2, max: 5.7}},
        plugins: {legend: {display: false}}
      }
    };


    const barChartAblationRGB2X = new Chart(
      document.getElementById('barChartAblationRGB2X'),
      configAblationRGB2X
    );

    const barChartAblationAll2X = new Chart(
      document.getElementById('barChartAblationAll2X'),
      configAblationAll2X
    );

    const barChartAblationAlphas = new Chart(
      document.getElementById('barChartAblationAlphas'),
      configAblationAlphas
    );

    const barChartAblationInputTokens = new Chart(
      document.getElementById('barChartAblationInputTokens'),
      configAblationInputTokens
    );

    const barChartAblationTargetTokens = new Chart(
      document.getElementById('barChartAblationTargetTokens'),
      configAblationTargetTokens
    );


    const barChartScalingDataset = new Chart(
      document.getElementById('barChartScalingDataset'),
      configScalingDataset
    );

    const barChartScalingTokens = new Chart(
      document.getElementById('barChartScalingTokens'),
      configScalingTokens
    );

    const barChartScalingModel = new Chart(
      document.getElementById('barChartScalingModel'),
      configScalingModel
    );

})

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

SRC_CAPTIONS = [
  'walkability:0.06g.complexity:0.03clutterscore:44...',
  'walkability:0.12g.complexity:0.43clutterscore:71...',
  'walkability:0.14g.complexity:0.04clutterscore:55...',
  'walkability:0.00g.complexity:0.17clutterscore:32...',
  'walkability:0.18g.complexity:0.17clutterscore:74...',
  'walkability:0.16g.complexity:0.15clutterscore:45...',
  'theviewfromthetopof<person>lookout',
  '<person>showingmountainsaswellas afamily',
  'theviewfromthepierattheentranceofthesea',
  'theviewfromthetopofthehill',
  'theviewfromthetopofthemountain',
  'thestreetsoflisbon,portugal',
  'walkability:0.08g.complexity:0.04clutterscore:69...',
  'walkability:0.26g.complexity:0.11clutterscore:74...',
  'walkability:0.18g.complexity:0.04clutterscore:65...',
  'theroadtothemountains',
  'theviewfromthetopofthelakewanakalookout',
  'walkability:0.48g.complexity:0.01clutterscore:56...',
  'walkability:0.32g.complexity:0.01clutterscore:75...',
  'theviewfromthetopofthemountain',
  'theartofthelastofuspart 2',
  'walkability:0.10g.complexity:0.06clutterscore:75...',
  'thebluelagoon',
  'theturquoiselakesofthecanadianrockies',
  'walkability:0.16g.complexity:0.18clutterscore:69...',
  'walkability:0.06g.complexity:0.11clutterscore:69...',
  'theviewfromthesummitofmountrundle',
  'thehotelatlochlomond',
  'walkability:0.04g.complexity:0.11clutterscore:36...',
  'thethreehillsoftheancientcityofteanau,newzealand',
];

DST_CAPTIONS = [
  'walkability:0.06<br>g.complexity:0.03<br>clutterscore:44<br>...',
  'walkability:0.12<br>g.complexity:0.43<br>clutterscore:71<br>...',
  'walkability:0.14<br>g.complexity:0.04<br>clutterscore:55<br>...',
  'walkability:0.00<br>g.complexity:0.17<br>clutterscore:32<br>...',
  'walkability:0.18<br>g.complexity:0.17<br>clutterscore:74<br>...',
  'walkability:0.16<br>g.complexity:0.15<br>clutterscore:45<br>...',
  'the view from the top of <person> lookout',
  '<person> showing mountains as well as a family',
  'the view from the pier at the entrance of the sea',
  'the view from the top of the hill',
  'the view from the top of the mountain',
  'the streets of lisbon, portugal',
  'walkability:0.08<br>g.complexity:0.04<br>clutterscore:69...<br>',
  'walkability:0.26<br>g.complexity:0.11<br>clutterscore:74...<br>',
  'walkability:0.18<br>g.complexity:0.04<br>clutterscore:65...<br>',
  'the road to the mountains',
  'the view from the top of the lake wanaka lookout',
  'walkability:0.4<br>g.complexity:0.01<br>clutterscore:56<br>...',
  'walkability:0.3<br>g.complexity:0.01<br>clutterscore:75<br>...',
  'the view from the top of the mountain',
  'the art of the last of us part 2',
  'walkability:0.10<br>g.complexity:0.06<br>clutterscore:75<br>...',
  'the blue lagoon',
  'the turquoise lakes of the canadian rockies',
  'walkability:0.16<br>g.complexity:0.18<br>clutterscore:69<br>...',
  'walkability:0.06<br>g.complexity:0.11<br>clutterscore:69<br>...',
  'the view from the summit of mount rundle',
  'the hotel at loch lomond',
  'walkability:0.04<br>g.complexity:0.11<br>clutterscore:36<br>...',
  'the three hills of the ancient city of te anau, new zealand',
];

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('matrixFrame').addEventListener('load', function() {
    var iframeContent = document.getElementById('matrixFrame').contentDocument;
  
    if (iframeContent) {
      var images = iframeContent.querySelectorAll('image');
      var texts = iframeContent.querySelectorAll('g');
  
      images.forEach(function(image) {
        image.addEventListener('click', function() {
          var imageUrl = image.getAttribute('xlink:href');
  
          // Show the overlay
          document.getElementById('overlay').style.display = 'block';
  
          // Create and show the popup
          var popup = document.getElementById('popup');

          popup.innerHTML = '<img src="' + imageUrl + '" alt="Popup Image">';
          popup.style.display = 'block';
          popup.style.height = '30vh';

        });
      });

      texts.forEach(function(text) {
        var textNodes = Array.from(text.childNodes).filter(node => (node.nodeName == 'g' && node.childNodes[0].nodeName == 'text' && node.childNodes.length > 3));
        textNodes.forEach(function(node) {
          var text = '';
          node.childNodes.forEach(function(t) {
            text += t.textContent;
          });
          var index = SRC_CAPTIONS.indexOf(text);
          text = DST_CAPTIONS[index];

          node.addEventListener('click', function() {

            // Show the overlay
            document.getElementById('overlay').style.display = 'block';
    
            // Create and show the popup
            var popup = document.getElementById('popup');

            popup.innerHTML = '<div class="content has-text-centered"><p>' + text + '</p></div>';
            popup.style.display = 'block';
            popup.style.height = 'auto';
          });
        });
      });
    } else {
      console.error('Failed to access the contentDocument of the iframe.');
    }
  });

  // Close the popup when clicking on the overlay
  document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
  })
});

function smoothScroll(targetId) {
  var targetElement = document.getElementById(targetId);
  var offset = document.getElementById('navbar').offsetHeight * 1.5; // You can adjust this value to control the scroll offset

  if (targetElement) {
    var elementPosition = targetElement.getBoundingClientRect();
    var targetPosition = elementPosition.top - offset + window.scrollY;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }else if (targetId.length == 0){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var navLinks = document.querySelectorAll('a.navbar-item, a.navbar-link, a.tile');

  navLinks.forEach(function(link) {
    var targetId = link.getAttribute('href').substring(1); // Get the target ID
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      smoothScroll(targetId);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// // Shuffle team members on page load
// document.addEventListener('DOMContentLoaded', function() {
//   const teamMembersContainer = document.getElementById('team-members');
//   const teamMembers = Array.from(teamMembersContainer.children);

//   shuffleArray(teamMembers);

//   // Clear the existing content and append the shuffled elements
//   teamMembersContainer.innerHTML = '';
//   teamMembers.forEach(member => {
//     teamMembersContainer.appendChild(member);
//   });
// });