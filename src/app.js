import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "./app.css";

function App() {
  function run(contract, collectionText) {
    const options = {
      method: "GET",
      url: `https://api.reservoir.tools/orders/asks/v4?contracts=${contract}&status=active&source=opensea.io&includeCriteriaMetadata=false&includeRawData=false&normalizeRoyalties=false&sortBy=createdAt&limit=1000`,
      headers: {
        accept: "*/*",
        "x-api-key": process.env.REACT_APP_RESERVOIR_PK,
      },
    };

    const options2 = {
      method: "GET",
      url: `https://api.reservoir.tools/orders/bids/v5?contracts=${contract}&includeCriteriaMetadata=false&includeRawData=false&normalizeRoyalties=false&sortBy=createdAt&limit=1000`,
      headers: {
        accept: "*/*",
        "x-api-key": process.env.REACT_APP_RESERVOIR_PK,
      },
    };

    axios //orders chart
      .request(options2)
      .then(function (response) {
        const decimals = Array.from(
          new Set(
            response.data.orders
              .map((order) => order.price.amount.decimal)
              .sort((a, b) => b - a)
          )
        );

        const decimalsOcurrences = Array.from(
          response.data.orders
            .map((order) => order.price.amount.decimal)
            .sort((a, b) => b - a)
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
            .values()
        );

        document.getElementById("collectionName").innerText = collectionText;

        console.log(decimalsOcurrences);

        new Chart(document.getElementById("orders-chart"), {
          type: "bar",
          data: {
            labels: decimals,
            datasets: [
              {
                label: "Amount of buy orders",
                backgroundColor: "#3e95cd",
                data: decimalsOcurrences,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050",
            },
          },
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    axios //listings chart
      .request(options)
      .then(function (response) {
        const decimals = Array.from(
          new Set(
            response.data.orders
              .map((order) => order.price.amount.decimal)
              .sort((a, b) => a - b)
          )
        );

        const decimalsOcurrences = Array.from(
          response.data.orders
            .map((order) => order.price.amount.decimal)
            .sort((a, b) => a - b)
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
            .values()
        );

        console.log(decimalsOcurrences);

        new Chart(document.getElementById("listings-chart"), {
          type: "bar",
          data: {
            labels: decimals,
            datasets: [
              {
                label: "Amount of NFTs Listed",
                backgroundColor: "#3e95cd",
                data: decimalsOcurrences,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050",
            },
          },
        });

        new Chart(ctx).Line(data, {
          onAnimationComplete: function () {
            var sourceCanvas = this.chart.ctx.canvas;
            // the -5 is so that we don't copy the edges of the line
            var copyWidth = this.scale.xScalePaddingLeft - 5;
            // the +5 is so that the bottommost y axis label is not clipped off
            // we could factor this in using measureText if we wanted to be generic
            var copyHeight = this.scale.endPoint + 5;
            var targetCtx = document
              .getElementById("myChartAxis")
              .getContext("2d");
            targetCtx.canvas.width = copyWidth;
            targetCtx.drawImage(
              sourceCanvas,
              0,
              0,
              copyWidth,
              copyHeight,
              0,
              0,
              copyWidth,
              copyHeight
            );
          },
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  run("0x49c36AFa15C7Fdbd57cE3D61D80F39b6615A76Ef", "3D Invisible Friends");

  const next = (a, b) => {
    let chartStatus = Chart.getChart("listings-chart"); // <canvas> id
    let chartStatus2 = Chart.getChart("orders-chart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus2.destroy();
      chartStatus.destroy();
      run(a, b);
    }
  };

  return (
    <div>
      <h1>Check the amount of listings/orders for certain NFT projects</h1>
      <p>Detect Buy & Sell-Walls and plan accordingly with your investments</p>
      <input placeholder="Smart Contract" id="contractField"></input>
      <button
        onClick={() => {
          let input = document.getElementById("contractField").value;
          next(input, "Custom");
        }}
      >
        Enter
      </button>

      <div className="QuickLinks">
        <button
          onClick={() => {
            next("0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "CryptoPunks");
          }}
        >
          CryptoPunks
        </button>
        <button
          onClick={() => {
            next(
              "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
              "Bored Ape Yacht Club"
            );
          }}
        >
          BAYC
        </button>
        <button
          onClick={() => {
            next(
              "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
              "Mutant Ape Yacht Club"
            );
          }}
        >
          MAYC
        </button>
        <button
          onClick={() => {
            next(
              "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
              "Otherdeed for Otherside"
            );
          }}
        >
          Otherdeed
        </button>
        <button
          onClick={() => {
            next("0xED5AF388653567Af2F388E6224dC7C4b3241C544", "Azuki");
          }}
        >
          Azuki
        </button>
        <button
          onClick={() => {
            next(
              "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
              "CLONE X - X TAKASHI MURAKAMI"
            );
          }}
        >
          Clone X
        </button>
        <button
          onClick={() => {
            next("0x23581767a106ae21c074b2276D25e5C3e136a68b", "Moonbirds");
          }}
        >
          Moonbirds
        </button>
        <button
          onClick={() => {
            next(
              "0x066f2D5ead7951F0d0038C19AffD500B9F02c0e5",
              "SUPERPLASTIC: Cryptojankyz"
            );
          }}
        >
          Cryptojankyz
        </button>
        <button
          onClick={() => {
            next("0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", "Doodles");
          }}
        >
          Doodles
        </button>
        <button
          onClick={() => {
            next("0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7", "Meebits");
          }}
        >
          Meebits
        </button>
      </div>

      <p>
        Now showing for: <b id="collectionName"></b>
      </p>

      <p>This is how many active listings there are:</p>
      <div class="chartWrapper">
        <div class="chartAreaWrapper">
          <canvas id="listings-chart"></canvas>
        </div>
        <canvas id="myChartAxis" height="300" width="0"></canvas>
      </div>

      <p>This is how many active buy-orders there are:</p>
      <div class="chartWrapper">
        <div class="chartAreaWrapper">
          <canvas id="orders-chart"></canvas>
        </div>
        <canvas id="myChartAxis2" height="300" width="0"></canvas>
      </div>

      <p>Made by</p>
      <a href="https://www.linkedin.com/in/jan-christian-swoboda-9b4b331a0/">
        Jan Christian Swoboda
      </a>
      <p>aka Jan Swoboda#5099 on Discord</p>
      <p>
        P.S.: Join NFT University on Discord, the most sophisticated German NFT
        Group
      </p>
      <a href="https://discord.gg/nftuniversity">Discord invite</a>
    </div>
  );
}

export default App;
