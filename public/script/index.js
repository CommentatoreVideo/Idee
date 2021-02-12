document.addEventListener("DOMContentLoaded", function() {
  //Progetti
  $.get("elencoProgetti/", function(data) {
    const progetti=data;
    for(const nome in progetti) {
      const progetto=progetti[nome];
      const daFare=progetto['da fare'];
      const idee=progetto['idee'];
      const indice=progetto['indice'];
      const col=$("<div></div>").addClass("col-xl-6");
      const card=$("<div></div>").addClass("card").addClass("mb-4");
      const cardHeader=$("<div></div>").addClass("card-header");
      const link=$("<a></a>").text(nome).attr("href","/progetto/?indice="+indice);
      cardHeader.append(link);
      const cardBody=$("<div></div>").addClass("card-body");
      const ulIdee=$("<ul></ul>");
      for(const idea in idee)
        ulIdee.append($("<li></li>").text(idea));
      cardBody.append(ulIdee);
      card.append(cardHeader);
      card.append(cardBody);
      col.append(card);
      $("#divProgetti").append(col);
    }
  });
  // <div class="col-xl-6">
  //                               <div class="card mb-4">
  //                                   <div class="card-header">
  //                                       <i class="fas fa-chart-area mr-1"></i>
  //                                       Area Chart Example
  //                                   </div>
  //                                   <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
  //                               </div>
  //                           </div>
});