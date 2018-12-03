



var shuffleSequence = seq("consent","setcounter","instructions",startsWith("Practice"),"cont",rshuffle(startsWith("experiment")),"post-exp");
var practiceItemTypes = ["practice+1", "practice+2"];
var manualSendResults = true;
var showProgressBar = true;


var defaults = [
    "Separator", {
      //  transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        continueMessage: "Click here to continue."
      //  errorMessage: "Wrong. Please wait for the next sentence."
    },
    "Message", {
        transfer: 4000,
        hideProgressBar: true,
        continueMessage: "Click here to continue."
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Click here to continue."
    }
];

define_ibex_controller({
    name: "WrittenJudgement",
    jqueryWidget: {
        _init: function () {
         //  console.log(this.options);
          //  console.log(this.options.question);
         //   this.options.transfer = null; // Remove â€™click to continue messageâ€™.
            
            
            this.element.VBox({
                options: this.options,
                triggers: [2],
                children: [
                    "Message", { html: '<html><div align="left"><p><b>'+this.options.background+'</b></p></div></html>', transfer: null},
                    "Message", { html: '<html><div align="left"><p><i>'+this.options.stims+'</i></p></div></html>', transfer: 2000},
                  //  "Message", {html: '<html><div align="left"><p>It is...</p></div></html>', transfer: null},
                    "Form", {html: {include: "form.html"}, transfer: null}
                  //  "Message", { html: '<html><div align="left"><p>'+this.options.question+'</p></div></html>', transfer: null}
                ]
            });
             $("input[name=ItemName]").val(this.options.ItemName);
             $("input[name=polarity]").val(this.options.polarity);
             $("input[name=lemma]").val(this.options.lemma);
             $("input[name=Group]").val(this.options.Group);
             $("input[name=HTclass]").val(this.options.HTclass);
             $("input[name=stims]").val(this.options.stims);
             $("input[name=mcpred]").val(this.options.mcpred);
             $("input[name=ECcont]").val(this.options.ECcont);
             $("input[name=question]").text(this.options.question);
             $("input[name=topic]").val(this.options.topic);
             $("input[name=background]").val(this.options.background);
             $("p[name=background]").text(this.options.background);
             $("p[name=stims]").text(this.options.stims);
             $("p[name=q]").text(this.options.question);
        }
    },
    properties: { }
});


var items = GetItemsFrom(data, null, {
    
  ItemGroup: ["ItemNo", "Group"], 
  
  Elements: [
    
      
      //function(row){ return [row.ItemName, row.polarity, row.lemma, row.Group, row.HTclass, row.stims, row.mcpred, row.ECcont, row.topic, row.question, row.background].join('+'); },
    
      function(row){return row.Expt}, "WrittenJudgement", {
          background: function(row){ return row.background; },
          stims: function(row){ return row.stims; },
          question: function(row){ return row.question; },
          ItemName: function(row){return row.ItemName;},
          polarity: function(row){return row.polarity;},
          lemma: function(row){return row.lemma;},
          Group: function(row){return row.Group;},
          HTclass: function(row){return row.HTclass;},
          mcpred: function(row){return row.mcpred;},
          ECcont: function(row){return row.ECcont;},
          topic: function(row){return row.topic;}
            
      },    
    
  ] 
    
}).concat(


  [   
    ["consent", "Form", { html: {include: "IbexConsentSona.html"} } ],    
    ["setcounter", "__SetCounter__", { } ],     
    ["instructions", "Form", { html: {include: "IbexInstructions.html"} } ],    
    ["cont", "Message", {html: '<html><div align="center"><p>The actual experiment is about to begin.</p><p> Please turn off any possible distractions and complete the experiment in one sitting.</p></div></html>'}],    
    ["practice", "Separator", {transfer: "keypress", normalMessage: "Thanks. Please click here, or press any key to proceed to the experiment." } ],
    ["post-exp", "Form", { html: {include: "IbexFeedbackPreConfirmation.html"} } ],
    ["post-exp", "__SendResults__", {} ],                       
    ["post-exp", "Form", { html: {include: "IbexConfirmationPage.html"} } ],
    ["post-exp", "Form", {html: {include: "IbexDebriefing.html"} } ]
    
  ]
    
);
console.log(items[1][2]);