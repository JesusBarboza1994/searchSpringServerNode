import { URL } from 'url'

export default class Fetcher {
  static async run(url, config={
    method: undefined,
    body: undefined,
    headers: undefined,
  }) {
    let data;
    let response
    try {
      response = await fetch(url, config);
    } catch (error) {
      console.log("Fetch failed: ", error)
    }
    if (!response.ok) {
      try {
        data = await response.json()
      } catch (error) {
        console.log("ERR ACA", error)
        throw new Error(response.statusText);
      }
      throw new Error(data.errors);
    }
    try {
      data = await response.json();
    } catch (error) {
      data = response.statusText;
    }
    console.log("DATA", data)
    return data;
  }

  static async put (url, data = {}, headers = {}, context = undefined) {
    return await Fetcher.run(
      url,
      {
        body: data,
        method: 'PUT',
        headers
      },
      context
    )
  }

  static async get (url, headers = {}, context = undefined, timeout_ms = undefined) {
    return await Fetcher.run(
      url,
      {
        method: 'GET',
        headers,
        timeout_ms
      },
      context
    )
  }

  static async post (url, data = {}, headers = {}, context = undefined) {
    return await Fetcher.run(
      url,
      {
        body: data,
        method: 'POST',
        headers
      },
      context
    )
  }

  static async delete (url, headers = {}, context = undefined) {
    return await Fetcher.run(
      url,
      {
        method: 'DELETE',
        headers
      },
      context
    )
  }

  static async patch (url, data = {}, headers = {}, context = undefined) {
    return await Fetcher.run(
      url,
      {
        body: data,
        method: 'PATCH',
        headers
      },
      context
    )
  }
}
