d3.csv('static/images/metadata2x/metadata.csv', function(error, data) {
    d3.shuffle(data);

    var formatNumber = d3.format(",d");

    data.forEach(d => {
      // Coerce to numbers

      // Semantic metadata
      d.walkability = +d.walkability;
      d.n_sam_instances = +d.n_sam_instances;
      d.n_coco_instances = +d.n_coco_instances;
      d.n_humans = +d.n_humans;
      d.semantic_diversity = +d.semantic_diversity;
      d.coco_instance_diversity = +d.coco_instance_diversity;
      d.objectness = +d.objectness;

      // Geometric metadata
      d.geometric_complexity = +d.geometric_complexity;
      d.occlusion = +d.occlusion_score;

      // Image metadata
      d.original_width = +d.original_width;
      d.original_height = +d.original_height;
      d.brightness = +d.brightness;
      d.contrast = +d.contrast;
      d.saturation = +d.saturation;
      d.colorfulness = +d.colorfulness;
      d.entropy = +d.entropy;
    });

    var metadatastats = crossfilter(data),
        all = metadatastats.groupAll(),

        walkability = metadatastats.dimension(function(d) { return d.walkability; }),
        walkabilityBin = 0.5,
        walkabilityGroups = walkability.group(function(d) { return Math.floor(d / walkabilityBin) * walkabilityBin; });

        n_sam_instances = metadatastats.dimension(function(d) { return d.n_sam_instances; }),
        n_sam_instancesBin = 5,
        n_sam_instancesGroups = n_sam_instances.group(function(d) { return Math.floor(d / n_sam_instancesBin) * n_sam_instancesBin; });

        n_coco_instances = metadatastats.dimension(function(d) { return d.n_coco_instances; }),
        n_coco_instancesBin = 1,
        n_coco_instancesGroups = n_coco_instances.group(function(d) { return Math.floor(d / n_coco_instancesBin) * n_coco_instancesBin; });

        n_humans = metadatastats.dimension(function(d) { return d.n_humans; }),
        n_humansBin = 1,
        n_humansGroups = n_humans.group(function(d) { return Math.floor(d / n_humansBin) * n_humansBin; });

        semantic_diversity = metadatastats.dimension(function(d) { return d.semantic_diversity; }),
        semantic_diversityBin = 1,
        semantic_diversityGroups = semantic_diversity.group(function(d) { return Math.floor(d / semantic_diversityBin) * semantic_diversityBin; });

        coco_instance_diversity = metadatastats.dimension(function(d) { return d.coco_instance_diversity; }),
        coco_instance_diversityBin = 1,
        coco_instance_diversityGroups = coco_instance_diversity.group(function(d) { return Math.floor(d / coco_instance_diversityBin) * coco_instance_diversityBin; });

        objectness = metadatastats.dimension(function(d) { return d.objectness; }),
        objectnessBin = 0.33,
        objectnessGroups = objectness.group(function(d) { return Math.floor(d / objectnessBin) * objectnessBin; });

        geometric_complexity = metadatastats.dimension(function(d) { return d.geometric_complexity; }),
        geometric_complexityBin = 0.025,
        geometric_complexityGroups = geometric_complexity.group(function(d) { return Math.floor(d / geometric_complexityBin) * geometric_complexityBin; });

        occlusion = metadatastats.dimension(function(d) { return d.occlusion; }),
        occlusionBin = 0.25,
        occlusionGroups = occlusion.group(function(d) { return Math.floor(d * occlusionBin) * occlusionBin; });

        original_width = metadatastats.dimension(function(d) { return d.original_width; }),
        original_widthBin = 32,
        original_widthGroups = original_width.group(function(d) { return Math.floor(d / original_widthBin) * original_widthBin; });

        original_height = metadatastats.dimension(function(d) { return d.original_height; }),
        original_heightBin = 32,
        original_heightGroups = original_height.group(function(d) { return Math.floor(d / original_heightBin) * original_heightBin; });

        brightness = metadatastats.dimension(function(d) { return d.brightness; }),
        brightnessBin = 1,
        brightnessGroups = brightness.group(function(d) { return Math.floor(d / brightnessBin) * brightnessBin; });

        contrast = metadatastats.dimension(function(d) { return d.contrast; }),
        contrastBin = 1,
        contrastGroups = contrast.group(function(d) { return Math.floor(d / contrastBin) * contrastBin; });

        saturation = metadatastats.dimension(function(d) { return d.saturation; }),
        saturationBin = 1,
        saturationGroups = saturation.group(function(d) { return Math.floor(d / saturationBin) * saturationBin; });

        colorfulness = metadatastats.dimension(function(d) { return d.colorfulness; }),
        colorfulnessBin = 1,
        colorfulnessGroups = colorfulness.group(function(d) { return Math.floor(d / colorfulnessBin) * colorfulnessBin; });

        entropy = metadatastats.dimension(function(d) { return d.entropy; }),
        entropyBin = 0.1,
        entropyGroups = entropy.group(function(d) { return Math.floor(d / entropyBin) * entropyBin; });

    var rangeMax = 300;

    var charts = [

      barChart()
        .dimension(n_sam_instances)
        .group(n_sam_instancesGroups)
        .x(d3.scale.linear()
        .domain([0, 250])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(n_coco_instances)
        .group(n_coco_instancesGroups)
        .x(d3.scale.linear()
        .domain([0, 30])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(n_humans)
        .group(n_humansGroups)
        .x(d3.scale.linear()
        .domain([0, 25])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(semantic_diversity)
        .group(semantic_diversityGroups)
        .x(d3.scale.linear()
        .domain([1, 21])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(coco_instance_diversity)
        .group(coco_instance_diversityGroups)
        .x(d3.scale.linear()
        .domain([0, 11])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(objectness)
        .group(objectnessGroups)
        .x(d3.scale.linear()
        .domain([0.0, 100.0])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(walkability)
        .group(walkabilityGroups)
        .x(d3.scale.linear()
        .domain([0.0, 100.0])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(occlusion)
        .group(occlusionGroups)
        .x(d3.scale.linear()
        .domain([0.0, 25.0])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(geometric_complexity)
        .group(geometric_complexityGroups)
        .x(d3.scale.linear()
        .domain([0.0, 0.75])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(original_width)
        .group(original_widthGroups)
        .x(d3.scale.linear()
        .domain([0, 4096])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(original_height)
        .group(original_heightGroups)
        .x(d3.scale.linear()
        .domain([0, 4096])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(brightness)
        .group(brightnessGroups)
        .x(d3.scale.linear()
        .domain([0, 255])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(contrast)
        .group(contrastGroups)
        .x(d3.scale.linear()
        .domain([0, 127])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(saturation)
        .group(saturationGroups)
        .x(d3.scale.linear()
        .domain([0, 255])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(colorfulness)
        .group(colorfulnessGroups)
        .x(d3.scale.linear()
        .domain([0, 150])
        .rangeRound([0, rangeMax])),

      barChart()
        .dimension(entropy)
        .group(entropyGroups)
        .x(d3.scale.linear()
        .domain([1, 9.5])
        .rangeRound([0, rangeMax])),

    ];

    var chart = d3.selectAll(".chart")
        .data(charts)
        .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

    // Render the initial lists.
    var sampleList = d3.selectAll(".sample")
        .data([showSamples]);

    // Render the total.
    d3.selectAll("#total")
        .text(formatNumber(metadatastats.size()));

    renderAll();

    // Renders the specified chart or list.
    function render(method) {
      d3.select(this).call(method);
    }

    // Whenever the brush moves, re-rendering everything.
    function renderAll() {
      chart.each(render);
      sampleList.each(render);
      d3.select("#active").text(formatNumber(all.value()));
    }

    window.filter = function(filters) {
      filters.forEach(function(d, i) { charts[i].filter(d); });
      renderAll();
    };

    window.reset = function(i) {
      charts[i].filter(null);
      renderAll();
    };

    function showSamples(div) {
      var topSamples = walkability.top(metadatastats.size());
      topSamples = d3.shuffle(topSamples).slice(0,10);

      div.each(function() {

        var elem = d3.select(this).selectAll('img')
          .data(topSamples, d => d.fname); // Need to map to a unique key

        elem.enter()
          .append('img')
          .attr('width', '100%')
          .attr('src', x => 'https://storage.googleapis.com/four_m_site/images/metadata2x/samples/' + x.fname + '.webp');

        elem.exit().remove();
        // elem.order();
      });
    }

    function barChart() {
      if (!barChart.id) barChart.id = 0;

      var margin = {top: 0, right: 10, bottom: 20, left: 10},
          x,
          y = d3.scale.linear().range([50, 0]),
          id = barChart.id++,
          axis = d3.svg.axis().orient("bottom"),
          brush = d3.svg.brush(),
          brushDirty,
          dimension,
          group,
          round;

      function chart(div) {
        var width = x.range()[1],
            height = y.range()[0];

        y.domain([0, group.top(1)[0].value]);

        div.each(function() {
          var div = d3.select(this),
              g = div.select("g");

          // Create the skeletal chart.
          if (g.empty()) {
            div.select(".title").append("a")
                .attr("href", "javascript:reset(" + id + ")")
                .attr("class", "reset")
                .text("reset")
                .style("display", "none");

            g = div.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.append("clipPath")
                .attr("id", "clip-" + id)
              .append("rect")
                .attr("width", width)
                .attr("height", height);

            g.selectAll(".bar")
                .data(["background", "foreground"])
              .enter().append("path")
                .attr("class", function(d) { return d + " bar"; })
                .datum(group.all());

            g.selectAll(".foreground.bar")
                .attr("clip-path", "url(#clip-" + id + ")");

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(axis);

            // Initialize the brush component with pretty resize handles.
            var gBrush = g.append("g").attr("class", "brush").call(brush);
            gBrush.selectAll("rect").attr("height", height);
            gBrush.selectAll(".resize").append("path").attr("d", resizePath);
          }

          // Only redraw the brush if set externally.
          if (brushDirty) {
            brushDirty = false;
            g.selectAll(".brush").call(brush);
            div.select(".title a").style("display", brush.empty() ? "none" : null);
            if (brush.empty()) {
              g.selectAll("#clip-" + id + " rect")
                  .attr("x", 0)
                  .attr("width", width);
            } else {
              var extent = brush.extent();
              g.selectAll("#clip-" + id + " rect")
                  .attr("x", x(extent[0]))
                  .attr("width", x(extent[1]) - x(extent[0]));
            }
          }

          g.selectAll(".bar").attr("d", barPath);
        });

        function barPath(groups) {
          var path = [],
              i = -1,
              n = groups.length,
              d;
          while (++i < n) {
            d = groups[i];
            // console.log(d.value);
            // console.log(y(d.value));
            path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
          }
          return path.join("");
        }

        function resizePath(d) {
          var e = +(d == "e"),
              x = e ? 1 : -1,
              y = height / 3;
          return "M" + (.5 * x) + "," + y
              + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
              + "V" + (2 * y - 6)
              + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
              + "Z"
              + "M" + (2.5 * x) + "," + (y + 8)
              + "V" + (2 * y - 8)
              + "M" + (4.5 * x) + "," + (y + 8)
              + "V" + (2 * y - 8);
        }
      }

      brush.on("brushstart.chart", function() {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", null);
      });

      brush.on("brush.chart", function() {
        var g = d3.select(this.parentNode),
            extent = brush.extent();
        if (round) g.select(".brush")
            .call(brush.extent(extent = extent.map(round)))
          .selectAll(".resize")
            .style("display", null);
        g.select("#clip-" + id + " rect")
            .attr("x", x(extent[0]))
            .attr("width", x(extent[1]) - x(extent[0]));
        dimension.filterRange(extent);
      });

      brush.on("brushend.chart", function() {
        if (brush.empty()) {
          var div = d3.select(this.parentNode.parentNode.parentNode);
          div.select(".title a").style("display", "none");
          div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
          dimension.filterAll();
        }
      });

      chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
      };

      chart.x = function(_) {
        if (!arguments.length) return x;
        x = _;
        axis.scale(x);
        brush.x(x);
        return chart;
      };

      chart.y = function(_) {
        if (!arguments.length) return y;
        y = _;
        return chart;
      };

      chart.dimension = function(_) {
        if (!arguments.length) return dimension;
        dimension = _;
        return chart;
      };

      chart.filter = function(_) {
        if (_) {
          brush.extent(_);
          dimension.filterRange(_);
        } else {
          brush.clear();
          dimension.filterAll();
        }
        brushDirty = true;
        return chart;
      };

      chart.group = function(_) {
        if (!arguments.length) return group;
        group = _;
        return chart;
      };

      chart.round = function(_) {
        if (!arguments.length) return round;
        round = _;
        return chart;
      };

      return d3.rebind(chart, brush, "on");
    }

  });