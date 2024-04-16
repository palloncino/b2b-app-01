import React from "react";
import { dateText } from "../../utils/date-text.js";
import Highlight from "../HighlightText/index.js";
import "./preventive-list.css";

function PreventiveList({ preventives, search }) {
  return (
    <div id="PreventiveList" className="preventive-list">
      {preventives.length > 0
        ? preventives.map(
            (
              { id, title, description, price, services, validity, pdfUrl, dateCreated, dateLastUpdate },
              i
            ) => {
              return (
                <div className="preventive-container" key={i + id}>
                  <div className="preventive-container-detail-container-top">
                    <div className="preventive-container-detail-container-top-group-1">
                      <div className="preventive-container-detail preventive-container-detail-id">
                        ID:
                        <Highlight text={id} search={search} />
                      </div>
                      <div className="preventive-container-detail preventive-container-detail-title">
                        <Highlight text={title} search={search} />
                      </div>
                    </div>
                    <div className="preventive-container-detail-container-top-group-2">
                      <div className="preventive-container-detail preventive-container-detail-pdf">
                        <a rel="noreferrer" target="_blank" href={pdfUrl}>
                          PDF
                        </a>
                      </div>
                      <div className="preventive-container-detail preventive-container-detail-pdf">
                        <a href={""}>View</a>
                      </div>
                      <div className="preventive-container-detail preventive-container-detail-pdf">
                        <a href={""}>Edit</a>
                      </div>
                    </div>
                  </div>

                  <div className="preventive-container-detail-container-bottom">
                    <div className="preventive-container-detail preventive-container-detail-desc">
                      {description}
                    </div>
                    <div className="preventive-container-detail preventive-container-detail-services">
                      {services}
                    </div>
                    <div className="preventive-container-detail preventive-container-detail-validity">
                      {validity}
                    </div>
                    <div className="preventive-container-detail preventive-container-detail-price">
                      {price} EUR
                    </div>
                    <div className="product-container-detail product-container-detail-date-created">
                      Created: {dateText(dateCreated)}
                    </div>
                    <div className="product-container-detail product-container-detail-date-last-updated">
                      Updated: {dateText(dateLastUpdate)}
                    </div>
                  </div>
                </div>
              );
            }
          )
        : "No preventives."}
    </div>
  );
}

export default PreventiveList;
